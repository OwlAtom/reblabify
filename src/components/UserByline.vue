<script setup>
import { useUsersStore } from "../stores/users";
import { ref, onBeforeMount } from "vue";

const usersStore = useUsersStore();
const props = defineProps({
  user: {
    type: Object,
  },
  userId: {
    type: String,
  },
});

const renderedUser = ref({ photoURL: "", displayName: "" });

onBeforeMount(async () => {
  if (props.user) {
    /* eslint-disable-next-line vue/no-setup-props-destructure */
    renderedUser.value = props.user;
  } else if (props.userId) {
    renderedUser.value = await usersStore.getUserById(props.userId).catch((error) => {
      console.error(error);
    });
  }
});
</script>
<template>
  <div class="profile">
    <img :src="renderedUser?.photoURL" :alt="'billede af ' + renderedUser?.displayName" />
    {{ renderedUser?.displayName }}
  </div>
</template>

<style lang="scss" scoped>
.profile {
  img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
}
</style>
