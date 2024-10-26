<template>
    <div v-if="showSecretCode" class="text-gray-700 mt-2">
      <div class="flex gap-1">
        <div
          v-for="(color, index) in secretCode"
          :key="index"
          :class="['w-8 h-8 rounded-full shadow', color]"
        ></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  
  export default defineComponent({
    name: "SecretCodeDisplay",
    props: {
      secretCode: {
        type: Array as PropType<string[]>,
        required: true,
      },
      showSecretCode: {
        type: Boolean,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .shadow {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
  </style>
  