import * as admin from "firebase-admin";

import {v4 as uuid} from "uuid";

type User = {
  email:string,
  password:string,
  firstName:string,
  lastName: string,
  bio:string,
  confirmationHash:string,
  createdAt:string,
  uid:string,
};

export const createUserAuthId = async (userDetails: User) => {
  const auth = admin.auth();
  const {email, password} = userDetails;

  const newUser = await auth.createUser({
    email,
    password,
  });

  return newUser.uid;
};

export const createTemporaryUsers = async (uid:string, usersDetails:User) => {
  const store = admin.firestore();
  const {email, password, firstName, lastName, bio} = usersDetails;

  const confirmationHash = uuid();
  const createdAt = Date.now();
  const temporaryUsersData = {
    email,
    password,
    firstName,
    lastName,
    bio,
    confirmationHash,
    createdAt,
  };

  return store.collection("temporaryUsers").doc().set(temporaryUsersData);
};
