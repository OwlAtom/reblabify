const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*
Cloud Function to expire tokens:
import { firestore } from 'firebase/app';

exports.cleanupTokens = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const tokensRef = firestore().collection("tokens");
    const query = tokensRef.where("timestamp", "<", cutoff);
    const tokens = await query.get();
    tokens.forEach(token => {
        token.ref.delete();
    });
});
*/

/*
relevante links:
https://firebase.google.com/docs/cloud-messaging/server

https://firebase.google.com/docs/functions

https://firebase.google.com/docs/cloud-messaging/send-message#send_messages_to_device_groups (the group is the invited users)


! Waiting for your first deploy ! https://console.firebase.google.com/project/reblabify/functions/list
*/
