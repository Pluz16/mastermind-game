<template>
    <div class="flex gap-2 mt-6">
      <button
        v-for="color in colors"
        :key="color"
        @click="$emit('colorSelected', color)"
        :class="['color-button', color]"
      ></button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  
  export default defineComponent({
    name: "ColorSelector",
    props: {
      colors: {
        type: Array as PropType<string[]>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .color-button {
    @apply w-10 h-10 rounded-full shadow-md transition duration-200 transform hover:scale-105;
  }
  </style>
  