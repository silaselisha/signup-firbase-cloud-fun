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
