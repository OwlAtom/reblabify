import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useUsersStore } from "./users";
import { defineStore } from "pinia";
import { ref, toRaw } from "vue";

const db = getFirestore();
const eventsCollection = collection(db, "events");

export const useEventsStore = defineStore(
  "events",
  () => {
    const events = ref([]);
    const userStore = useUsersStore();

    function addEvent(event) {
      const userId = userStore.getUserId();
      // if user id is not set, return
      if (!userId) return;

      // create a reference to the events collection
      // Add the users id to the event object and add the event to the events collection
      addDoc(eventsCollection, { ...event, host: userId })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          getEventById(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    async function getEventsByUserId(userId) {
      if (!userId) return;

      const hostQuery = query(eventsCollection, where("host", "==", userId));
      try {
        const querySnapshot = await getDocs(hostQuery);
        querySnapshot.forEach((doc) => {
          addEventToArray({ ...doc.data(), id: doc.id });
        });
      } catch (error) {
        console.log(error);
      }
    }

    function getUsersOwnEvents() {
      return getEventsByUserId(userStore.getUserId());
    }

    function getEventById(eventId) {
      // if undefined, throw error
      if (!eventId) throw new Error("Event Id is undefined");

      let event = findEventById(eventId);
      if (event !== null) {
        event.id = eventId;
        return Promise.resolve(event);
      }
      // get a single event by id
      const docRef = doc(db, "events", eventId);
      return new Promise((resolve, reject) => {
        getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              event = { ...doc.data(), id: doc.id };
              events.value.push(event);
              resolve(event);
            } else {
              resolve(null);
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
            reject(error);
          });
      });
    }

    function inviteFriendToEvent(eventId, friendId) {
      // dont submit invalid invite Ids
      // dont submit friends that are already invited!

      const event = findEventById(eventId);
      // add the friendId to the event.invited array
      event.invited.push(friendId);
      updateEventInDatabase(event, eventId);
    }

    async function inviteFriendByEmail(eventId, email) {
      const event = findEventById(eventId);
      // find the friends id by email
      const invitedUser = toRaw(await userStore.getUserByEmail(email));
      if (!invitedUser) {
        console.log("User not found");
        return;
      }
      // check that event has .invited array
      if (!event.invited) {
        event.invited = [];
      }
      // if the user is already invited, dont add them again
      if (event.invited.includes(invitedUser.id)) {
        return;
      }
      // add the friendId to the event.invited array
      event.invited.push(invitedUser.id);
      updateEventInDatabase(event, eventId);
    }

    function findEventById(eventId) {
      const event = events.value.find((event) => event.id === eventId);
      if (!event) {
        return null;
      }
      return event;
    }

    function updateEventInDatabase(event, eventId) {
      if (!event.id) {
        throw new Error("Event Id is undefined");
      }
      // update the event in the database
      const docRef = doc(db, "events", event.id);
      try {
        // remove the id from the event object
        const realEvent = toRaw(event);
        delete realEvent.id;
        updateDoc(docRef, realEvent)
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } catch (error) {
        console.error("Error updating document: ", error, toRaw(event));
      }
      // also update the event in the events array
      event.id = eventId;
      addEventToArray(event);
    }

    function returnFutureEvents() {
      return events.value.filter((event) => {
        // compares the event start date to the current date
        // if the event start date is in the past, it will not be returned
        // 2021-09-09 is the format of the date in the database
        const date = new Date(event.startDate);
        return date > new Date();
      });
    }
    function getInvitedEvents() {
      const userId = userStore.getUserId();

      if (!userId) return;
      // get list of events that the user is invited to
      const invitedQuery = query(eventsCollection, where("invited", "array-contains", userId));
      getDocs(invitedQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          addEventToArray({ ...doc.data(), id: doc.id });
        });
      });

      // get all events that the user is hosting
      // return the combined array
    }

    function addEventToArray(event) {
      console.log("adding event to array", event);
      // check if the event is already in the array
      const index = events.value.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        // if the event is already in the array, update it
        events.value[index] = event;
        return;
      }
      // if the event is not in the array, add it
      events.value.push(event);
    }

    async function changeAttendanceStatus(eventId, status) {
      // throw an error if status is not accepted, maybe or declined
      if (!["accepted", "maybe", "declined"].includes(status)) {
        throw new Error("Status must be accepted, maybe or declined");
      }
      // throw an error if eventId is undefined
      if (!eventId) throw new Error("Event Id is undefined");

      const event = await getEventById(eventId);
      const userId = userStore.getUserId();

      if (!event[status]) {
        event[status] = [];
      }

      // return if user is already in the status array
      if (event[status].includes(userId)) {
        console.log("User is already in the " + status + " array");
        return;
      }

      event[status].push(userId);
      // remove userId from other arrays
      if (status !== "accepted" && typeof event.attending === "object") {
        event.attending = event.attending.filter((id) => id !== userId);
      }
      if (status !== "maybe" && typeof event.maybe === "object") {
        event.maybe = event.maybe.filter((id) => id !== userId);
      }
      if (status !== "declined" && typeof event.declined === "object") {
        event.declined = event.declined.filter((id) => id !== userId);
      }

      event.invited = event.invited.filter((id) => id !== userId);

      updateEventInDatabase(event, eventId);
    }
    // easy to use helper functions:
    function acceptEvent(eventId) {
      changeAttendanceStatus(eventId, "accepted");
    }
    function maybeEvent(eventId) {
      changeAttendanceStatus(eventId, "maybe");
    }
    function declineEvent(eventId) {
      changeAttendanceStatus(eventId, "declined");
    }

    async function getAttendanceStatus(eventId) {
      // throw error if undefined eventId
      if (!eventId) {
        throw new Error("No event id provided");
      }
      const event = await getEventById(eventId);
      const userId = userStore.getUserId();
      if (event.accepted?.includes(userId)) {
        return "accepted";
      }
      if (event.maybe?.includes(userId)) {
        return "maybe";
      }
      if (event.declined?.includes(userId)) {
        return "declined";
      }
      return "invited";
    }

    return {
      events,
      addEvent,
      getEventsByUserId,
      getEventById,
      returnFutureEvents,
      findEventById,
      inviteFriendToEvent,
      getUsersOwnEvents,
      inviteFriendByEmail,
      getInvitedEvents,
      acceptEvent,
      maybeEvent,
      declineEvent,
      changeAttendanceStatus,
      getAttendanceStatus,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (state) => {
          return compressToUTF16(JSON.stringify(state));
        },
        deserialize: (state) => {
          return JSON.parse(decompressFromUTF16(state));
        },
      },
    },
  }
);
