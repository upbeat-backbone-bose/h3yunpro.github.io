<template>
  <div class="my-custom-content">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello World!')
</script>
