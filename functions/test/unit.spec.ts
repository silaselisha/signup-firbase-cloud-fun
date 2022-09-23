import { describe, expect, test, beforeAll } from '@jest/globals'
import * as functionsTest from 'firebase-functions-test'
import * as admin from 'firebase-admin'
import * as myFunctions from '../src'


const testEnv = functionsTest({
    databaseURL: 'https://signup-28422-default-rtdb.firebaseio.com',
    projectId: 'signup-28422'
}, './service.json')


describe('On creating a new user', () => {
    let wrapped: any
    beforeAll(() => {
        wrapped = testEnv.wrap(myFunctions.addUser)
    })
    test('Give me a new user', async () => {
        let path = 'temporaryUsers/1234567'

        const snap = await testEnv.firestore.makeDocumentSnapshot({
            firstName: 'Jack',
            lastName: 'Potter',
            email: 'jack@test.com',
            bio: 'UI/UX designer',
            password: 'pass12345'
        }, path)

        wrapped(snap)
        const after = await admin.firestore().doc(path).get()
        expect(after.exists).toBe(true)

        const dataMessage = after.data()
        console.log(dataMessage)
    })
})