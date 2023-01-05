<script setup>
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useUsersStore } from "../stores/users";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import welcomeIllustration from "../assets/illustrations/welcome.svg";

const router = useRouter();
const provider = new GoogleAuthProvider();
const auth = getAuth();

const googleSignIn = () => {
  signInWithRedirect(auth, provider);
};

onMounted(() => {
  getRedirectResult(auth)
    .then((result) => {
      // if the user is visiting this page, without being redirected from google sign in
      // the result object will not contain any valid token
      if (!result?._tokenResponse) {
        return;
      }

      const user = result.user;

      useUsersStore().setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      router.push({ name: "Home" });
    })
    .catch((error) => {
      console.warn(error);
    });
});
</script>

<template>
  <button @click="googleSignIn">Login</button>
  <welcomeIllustration />
  <a href="https://storyset.com/event">Event illustrations by Storyset</a>
</template>

<style scoped></style>
