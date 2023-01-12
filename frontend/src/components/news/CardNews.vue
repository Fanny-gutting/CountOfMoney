<script setup lang="ts">
import {IconKey} from '@/components'

  defineProps({
    link: String,
    title: String,
    image: String,
    desc: String
  });
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
  <figure><div v-html="desc" class="test2"></div></figure>
  <div class="card-body justify-between">
    <h2 class="card-title">
      {{title}}
    </h2>
    <div v-html="desc" class="test"></div>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">Member <IconKey class="fill-amber-400 ml-1"/></div>
    </div>
  </div>
</div>

</template>

<style>
.test img {
  display: none;
}
.test2 img{
  min-height: 15rem;
  max-height: 15rem;
}
.test2 p{
  color: gray;
  padding: 1rem !important;
  display: none;
}
</style>