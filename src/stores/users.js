import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { getAuth } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore(
  "users",
  () => {
    const db = getFirestore();
    const usersCollection = collection(db, "users");

    const users = ref({
      self: {
        displayName: null,
        photoURL: null,
        uid: null,
        loggedIn: false,
        email: null,
      },
      others: [],
    });

    function setUser(newUser) {
      users.value.self.displayName = newUser.displayName;
      users.value.self.photoURL = newUser.photoURL;
      users.value.self.uid = newUser.uid;
      users.value.self.email = newUser.email;
    }
    function clearUser() {
      users.value.self.displayName = null;
      users.value.self.photoURL = null;
      users.value.self.uid = null;
      users.value.self.email = null;
    }
    function getUserId() {
      return users.value.self.uid;
    }
    function init() {
      const auth = getAuth();

      auth.onAuthStateChanged((newUser) => {
        if (newUser) {
          setUser(newUser);
          if (!users.value.self.loggedIn) {
            createUser();
            users.value.self.loggedIn = true;
          }
        } else {
          users.value.self.loggedIn = false;
          clearUser();
        }
      });
    }
    function getUserById(userId) {
      const docRef = doc(db, "users", userId);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    async function getUserByEmail(email) {
      // check if the email is in the users.others object, if it is, return the user
      if (users.value.others.some((user) => user.email === email)) {
        return users.value.others.find((user) => user.email === email);
      }

      // if the email is not in the users.others object, then fetch the data from firestore
      const emailQuery = query(usersCollection, where("email", "==", email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      let user = null;
      // add the results to users.others
      emailQuerySnapshot.forEach((doc) => {
        user = { ...doc.data(), id: doc.id };
        users.value.others.push(user);
      });

      return user;
    }

    function search() {
      // TODO! select search service and setup their Firebase extension
      // https://firebase.google.com/docs/firestore/solutions/search
      // maybe also add user phone number and maybe other fields to search
    }
    function createUser() {
      const user = users.value.self;
      // set the doc id to the users id, so that docRef.id will return the users id
      const userDocRef = doc(db, "users", user.uid);
      // snakily check if the doc exists, if it does, if it doesn't, create it
      getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
        } else {
          // create the user from the ref
          setDoc(userDocRef, { email: user.email, displayName: user.displayName, photoURL: user.photoURL, friends: [] })
            .then(() => {
              console.log("Document written. ", userDocRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      });
    }

    return {
      users,
      setUser,
      clearUser,
      getUserId,
      init,
      getUserById,
      getUserByEmail,
      search,
      createUser,
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