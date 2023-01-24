const functions = require("firebase-functions");
const firebase = require("firebase-admin");
// init the app
firebase.initializeApp();
const firestore = firebase.firestore();
// realtime db
const db = firebase.database();
// messaging
const messaging = firebase.messaging();
//

/* Cloud Function to expire tokens: */
exports.cleanupTokens = functions.pubsub.schedule("every 24 hours").onRun(async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const tokensRef = firestore().collection("tokens");
  const query = tokensRef.where("timestamp", "<", cutoff);
  const tokens = await query.get();
  tokens.forEach((token) => {
    token.ref.delete();
  });
});

exports.scheduledFunction = functions.pubsub.schedule("every 1 minute").onRun(() => {
  console.log("This will be run every minute!");
  return null;
});

// For each new message in the chat / id collection in the realtime db, send a notification to the users
// exports.sendNotification = functions.database.ref("/chat/{id}").onCreate((snapshot, context) => {
//     const chat = snapshot.val();
//     const chatId = context.params.id;
//     //

/*
relevante links:
https://firebase.google.com/docs/cloud-messaging/server

https://firebase.google.com/docs/functions

https://firebase.google.com/docs/cloud-messaging/send-message#send_messages_to_device_groups (the group is the invited users)


! Waiting for your first deploy ! https://console.firebase.google.com/project/reblabify/functions/list
*/
