import { ref, computed } from "vue";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { defineStore } from "pinia";

export const useNameStore = defineStore(
  "name",
  () => {
    const name = ref({
      first: "Matt",
      last: "Harrison",
    });

    const fullName = computed(() => {
      return `${name.value.first} ${name.value.last}`;
    });

    const changeFirstName = (newName) => {
      name.value.first = newName;
    };
    const changeLastName = (newName) => {
      name.value.last = newName;
    };
    return {
      name,
      fullName,
      changeFirstName,
      changeLastName,
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
