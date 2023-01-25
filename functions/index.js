const functions = require("firebase-functions");
const firebase = require("firebase-admin");
// init the app
firebase.initializeApp();
const firestore = firebase.firestore();
// realtime db
// const db = firebase.database();
// messaging
const messaging = firebase.messaging();
//

/* Cloud Function to expire tokens: */
exports.cleanupTokens = functions.pubsub.schedule("every 24 hours").onRun(async () => {
  const now = new Date();
  const tokenMaxdays = 30;
  const cutoff = now.getTime() - 1000 * 60 * 60 * 24 * tokenMaxdays;

  const tokensRef = firestore.collection("tokens");
  const query = tokensRef.where("timestamp", "<", cutoff);
  const querySnapshot = await query.get();
  const docs = querySnapshot.docs;
  const batch = firestore.batch();
  docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log("Deleted", docs.length, "tokens");
  return null;
});

// message path in db: /chats/(eventId)/chat/(messageId) {message, photoURL, posted, sender, uid}
// event path in firestore: /events/(eventId) {icon, title, description, startDate, startTime, location, accepted, declined, invited, maybe} where accepted, declined, invited, maybe are arrays of user_IDs
// token path in firestore: /tokens/(tokenId) {token, user_ID, timestamp}
// when new message in the chat collection in the realtime db, send a notification to the users for that event

// its apparently not possible without enabling the cloud messaging api manually https://console.cloud.google.com/apis/library/googlecloudmessaging.googleapis.com?project=reblabify
exports.sendNotification = functions.database
  .ref("/chats/{eventId}/chat/{messageId}")
  .onCreate(async (snapshot, context) => {
    functions.logger.log("sendNotification triggered by ", snapshot.val().sender, " in event ", context.params.eventId);
    const text = snapshot.val().message;
    const eventId = context.params.eventId;

    // get the event
    const event = await firestore.collection("events").doc(eventId).get();
    const payload = {
      notification: {
        title: `${snapshot.val().sender} sent a message to '${event.data().title}'`,
        body: text ? (text.length <= 100 ? text : text.substring(0, 97) + "...") : "",
        icon: snapshot.val().photoURL,
        click_action: `https://reblabify.web.app/event-info/${eventId}`,
      },
    };

    // get all invited, accepted, declined, maybe users as invitedUsers
    const invitedUsers = event.data().invited.concat(event.data().accepted, event.data().declined, event.data().maybe);

    // the sender is always invited, so remove them from the list
    const senderId = snapshot.val().uid;
    invitedUsers.filter((user) => user !== senderId);

    // get the tokens for all the invited users
    const allTokens = await firestore.collection("tokens").get();
    const tokens = [];
    allTokens.forEach((token) => {
      if (invitedUsers.includes(token.data().user_ID)) {
        tokens.push(token.data().token);
      }
    });

    if (tokens.length > 0) {
      messaging.sendToDevice(tokens, payload);
      functions.logger.log("Notification sent successfully to ", tokens.length, " users");
    }
  });
/*
https://firebase.google.com/docs/functions/manage-functions

firebase messaging tutorial: https://firebase.google.com/codelabs/firebase-cloud-functions
*/
