import { objectChangeDiff } from '../javascript-helper';
import { describe, expect, it} from '@jest/globals'

describe('Util', () => {
  it('object change diff deep', () => {
    const DEL = '<DEL>';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 6],
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 7],
      deleted: 8,
    };

    const diff = objectChangeDiff(obj, objToCheck, DEL);

    expect(diff).toEqual({
      new: 1,
      changed: [6],
      deleted: DEL,
    });
  });

  it('object change diff shallow', () => {
    const DEL = 'Deleted';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 6],
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 7],
      deleted: 8,
    };

    const diff = objectChangeDiff(obj, objToCheck, DEL, false);
   
    expect(diff).toEqual({
      new: 1,
      sameDeep: [4],
      changed: [6],
      deleted: 'Deleted',
    });
  });

  it('object change diff with undefined', () => {
    // const DEL = '<DEL>';

    const obj = {
      changed: '',
    };

    const objToCheck = {
      changed: undefined,
    };

    const diff = objectChangeDiff(obj, objToCheck);

    expect(diff).toEqual({
      changed: '',
    });
  });
  it('Test for objects', () => {
    const DEL = 'Deleted';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: {test: 'test'},
      changed: {plug: 'task', take: 'jest'},
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: {test: 'test'},
      changed: {plug: 'task', take: 'mocha'},
      deleted: 8,
    };
    const diff = objectChangeDiff(obj, objToCheck, DEL)

    expect(diff).toEqual(expect.objectContaining({ changed: {take: 'jest' }, deleted: 'Deleted', new: 1 }))
  });
  it('Test for strings', () => {
    const DEL = 'Deleted';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: 'Tunneling',
      changed: 'Proxy servers',
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: 'Tunneling',
      changed: 'HTTPS Tunneling',
      deleted: 8,
    };
    const diff = objectChangeDiff(obj, objToCheck, DEL)

    expect(diff).toEqual(expect.objectContaining({changed: 'Proxy servers', deleted: 'Deleted', new: 1 }))
  });
  it('Test for arrays', () => {
    const DEL = 'Deleted';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: [1, 2, 4, [5, 6, 7], {name: 'Array'}],
      changed: [{task: 'jest test'}, 89, 100],
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: [1, 2, 4, [5, 6, 7], {name: 'Array'}],
      changed: [{plug: 'task', take: 'mocha'}, 100],
      deleted: 8,
    };

    const diff = objectChangeDiff(obj, objToCheck, DEL)
   
    expect(diff).toEqual(expect.objectContaining({
      changed: [ { task: 'jest test' }, 89, 100 ],
      deleted: 'Deleted',
      new: 1
    }))
  });
  it('Test for records', () => {
    interface CatInfo {
      age: number;
      breed: string;
    }
 
    type CatName = "miffy" | "boris" | "mordred";
 
    const cats: Record<CatName, CatInfo> = {
      miffy: { age: 10, breed: "Persian" },
      boris: { age: 5, breed: "Maine Coon" },
      mordred: { age: 16, breed: "British Shorthair" },
    };
    
    const dog: Record<CatName, CatInfo> = {
      miffy: { age: 15, breed: "Persian" },
      boris: { age: 50, breed: "Maine Coon" },
      mordred: { age: 26, breed: "British Shorthair" },
    };

    const diff = objectChangeDiff(cats, dog)

    expect(diff).toEqual(expect.objectContaining({ miffy: { age: 10 }, boris: { age: 5 }, mordred: { age: 16 } }))
  });
});
