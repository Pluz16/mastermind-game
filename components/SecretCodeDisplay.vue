<template>
    <div v-if="showSecretCode" class="secret-code-container text-gray-700 mt-2">
      <div class="flex gap-1">
        <div
          v-for="(color, index) in secretCode"
          :key="index"
          :class="['color-indicator', color]"
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
  .secret-code-container {
    @apply transition-opacity duration-300 ease-in-out; /* Graduale effetto di comparsa */
  }
  .color-indicator {
    @apply w-8 h-8 rounded-full shadow-md;
  }
  </style>
  