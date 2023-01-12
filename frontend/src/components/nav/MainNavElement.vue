<script setup lang="ts">
  import {
    useRoute
  } from 'vue-router'
  const route = useRoute()

 defineProps({
    to: {
      type: Object as() => {
        name: string
      },
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  })
</script>

<template>
    <li class='p-3 mt-2 rounded-lg px-4 duration-300 hover:bg-primary'>
      <router-link :to="{name: to.name}" class="flex items-center">
        <slot></slot>
        <span class="ml-4 text-gray-200">{{ label }}</span>
      </router-link>
    </li>
</template>