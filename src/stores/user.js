import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    displayName: null,
    photoURL: null,
    uid: null,
    loggedIn: false,
  });

  function setUser(newUser) {
    user.value.displayName = newUser.displayName;
    user.value.photoURL = newUser.photoURL;
    user.value.uid = newUser.uid;
  }
  function clearUser() {
    user.value.displayName = null;
    user.value.photoURL = null;
    user.value.uid = null;
  }
  function init() {
    const auth = getAuth();

    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        user.value.loggedIn = true;
        setUser(newUser);
      } else {
        user.value.loggedIn = false;
        clearUser();
      }
    });
  }

  return {
    user,
    setUser,
    clearUser,
    init,
  };
});
