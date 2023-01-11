<script setup>
import { useUsersStore } from "../stores/users";
import { ref } from "vue";

const usersStore = useUsersStore();
const props = defineProps({
  user: {
    type: Object,
  },
  userId: {
    type: String,
  },
});

const renderedUser = ref(null);

if (props.user) {
  /* eslint-disable-next-line vue/no-setup-props-destructure */
  renderedUser.value = props.user;
} else {
  renderedUser.value = usersStore.getUserById(props.userId);
}
</script>
<template>
  <div class="profile">
    <img :src="renderedUser?.photoURL" :alt="'billede af ' + renderedUser.displayName" />
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
