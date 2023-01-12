<script setup lang="ts">
  defineProps({
    title: {
      type: String,
    },
    subtitle: {
      type:String,
    },
    firstTh: {
      type:String,
    },
    secondTh: {
      type:String,
    }
  })
  
</script>

<template>
  <div class="overflow-x-auto card bg-base-100 shadow-xl p-4">
    <h2 class="font-bold text-2xl">{{ title }}</h2>
    <p class=" text-xs text-slate-500">{{ subtitle }}</p>
    <table class="table w-full">
    <thead>
      <tr>
        <th>{{ firstTh }}</th>
        <th>{{ secondTh }}</th>
        <th>Action</th>
      </tr>
    </thead>
    </table>
      <div>
        <slot></slot>
      </div>
  </div>
</template>