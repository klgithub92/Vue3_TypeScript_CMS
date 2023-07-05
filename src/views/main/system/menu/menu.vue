<template>
  <div class="menu">
    <PageContent :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/page.content'
</script>

<style scoped></style>
