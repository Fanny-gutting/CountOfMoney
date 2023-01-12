<script setup lang="ts">
import { NewsFeed, CryptoNewsLoading } from '@/components';
</script>


<template>
  <div>
    <Suspense>
      <template #default>
        <NewsFeed/>
      </template>
      <template #fallback>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-9">
          <CryptoNewsLoading v-for="(placeholder, index) in Array(8)" :key="index"/>
        </div>
      </template>
    </Suspense>
  </div>
</template>