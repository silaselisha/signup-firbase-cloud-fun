import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {createUserAuthId, createTemporaryUsers} from "./helpers";

admin.initializeApp();

export const createUserAcount = functions.https.onRequest(async (req, res) => {
  const usersDetails = req.body;

  const uuid = await createUserAuthId(usersDetails);

  await createTemporaryUsers(uuid, usersDetails);

  res.status(201).send({
    status: "success",
  });
});

export const addUser = functions.firestore.document("/temporaryUsers/{id}").onCreate((snap, context) => {
  try {
    console.log(context.params);
    return snap.ref.set({
      firstName: "Jack",
      lastName: "Potter",
      email: "jack@test.com",
      bio: "UI/UX designer",
      password: "pass12345"
    }, {merge: true});
  } catch (error) {
    console.log("Something went wrong");
    return Promise.reject(error);
  }
});
