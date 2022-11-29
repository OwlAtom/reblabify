import { defineStore } from "pinia";
import { ref } from "vue";

export const useclickStore = defineStore(
  "click",
  () => {
    const clicks = ref(0);

    const increment = () => {
      return clicks.value++;
    };

    const numberTimes5 = () => {
      return clicks.value * 5;
    };

    return {
      clicks,
      increment,
      numberTimes5,
    };
  },
  { persist: true }
);

// options store:
export const useClickStoreOptions = defineStore("click", {
  state: () => ({
    clicks: 0,
  }),
  getters: {
    numberTimes5: (state) => {
      return state.clicks * 5;
    },
  },
  actions: {
    increment: (state) => {
      state.clicks++;
    },
  },
  persist: true,
});
