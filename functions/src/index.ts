import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// from https://javebratt.com/firebase-cloud-functions-profile/
//import { functions } from 'firebase-functions';
//import { admin } from 'firebase-admin';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.createProfile = functions.auth
  .user()
  .onCreate((userRecord, context) => {
    // Do something after a new user account is created
    return admin
      .database()
      .ref(`/users/${userRecord.uid}`)
      .set({
      //        email: userRecord.metadata.email,
      //  isAdmin: false
        email: userRecord.email,
        lastLoggedIn: userRecord.metadata.lastSignInTime
      });

  });
