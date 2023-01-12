<script setup lang="ts">
import { computed, ref } from 'vue';

  const props = defineProps({
    tabs: {
      type: Object as () => {
        name: string,
        label: string,
        component: any,
        disabled?: boolean,
        props?: any,
      }[],
      required: true,
    },
  })

  const currentTabIndex = ref(0)
  const currentTab = computed(() => props.tabs[currentTabIndex.value])
</script>

<template>
  <div class="flex flex-col" :class="`gap-4`">

    <div class="flex" :class="` justify-start`">
      <div class="tabs flex flex-nowrap whitespace-nowrap overflow-auto px-6 py-1">
        <a 
          v-for="(tab, index) in tabs" 
          :key="`tab-${index}-${tab.name}`" 
          class="tab tab-bordered transition-all"
          :class="{
            'text-opacity-80 font-bold border-primary': currentTab.name === tab.name,
            'cursor-default text-base-200 hover:text-base-200 ': tab.disabled
            
          }"
          @click="!tab.disabled && (currentTabIndex = index)"
        >
          {{ tab.label }}
        </a>
      </div>
    </div>

    <div>
      <component :is="currentTab.component" v-bind="currentTab.props"></component>
    </div>

  </div>
</template>