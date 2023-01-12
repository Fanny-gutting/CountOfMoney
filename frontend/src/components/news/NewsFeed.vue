<script setup lang="ts">
import {ref, computed} from 'vue'
import {CardNews, SelectFlux} from '@/components'
import axios from 'axios';
import { useRSS, useAuth, useAdminSetting } from '@/uses';
import { remove } from '@vue/shared';

const { limitSetting } = await useAdminSetting()

const { setUser } = await useAuth()
const is_Auth = await setUser()

const { flux } = await useRSS()

const selectedFlux = ref(['bitcoin'])


  let allFlux: any[] = []
  Object.keys(flux).forEach(key => {
    Object.keys(flux[key]).forEach( prop => { 
      if(prop == "name"){
        allFlux.push(flux[key][prop])
      }
    })
  });

  
  let allUrl: string[] = []
  Object.keys(flux).forEach(key => {
    allUrl.push(flux[key].url)
  });

  const getFluxData = async () => {
  let returnValue = []
  for (let i = 0; i < allFlux.length; i++) {
    const urlParams = new URLSearchParams({ rss: `${allUrl[i]}` })
    const res = await axios.get(`https://flannel-glade.glitch.me/?${urlParams}`)
    returnValue[allFlux[i]] = res.data.rss.channel.item;
  } 
  return returnValue
}
const dataTest = await getFluxData()

const displayedDataFlux = computed(() => {
  const displayed: any[] = []
  selectedFlux.value.map((flux) => {
    const data = dataTest
    if (Object.keys(data).includes(flux)) {
      displayed.push(...data[flux as any])
    }
  })
  if(!is_Auth){
    return displayed.slice(0, limitSetting.rss)
  }
  return displayed
})

const selectAll = () => selectedFlux.value = allFlux

const toggleFlux = (allFlux: string) => {
  const removeFlux = () => selectedFlux.value.splice(selectedFlux.value.findIndex(found => found === allFlux), 1)
  const addFlux = () => selectedFlux.value.push(allFlux)
  if (selectedFlux.value.includes(allFlux)) removeFlux()
  else addFlux()
}

const toggleFluxAnonymous = (allFlux: string) => {
  selectedFlux.value = [allFlux]
}

</script>

<template>
  <div>
    <div>
        <ul class="flex gap-4 mb-11 flex-wrap">
          <li v-for="flux in allFlux" :key="flux">
            <button 
              @click.prevent="(!is_Auth) ? toggleFluxAnonymous(flux) : toggleFlux(flux)"
              class="btn py-1 px-5 rounded-lg glass shadow-lg cursor-pointer hover:bg-primary"
              :class="{
                'bg-primary glass text-white shadow-lg hover:brightness-90': selectedFlux.includes(flux),
                'text-gray-900 bg-white hover:text-gray-600 hover:bg-gray-50': !selectedFlux.includes(flux)
              }"
            >
              {{ flux }}
            </button>
          </li>
          <li v-if="is_Auth">
            <button 
              @click.prevent="selectAll" 
              class="btn glass py-1 px-5 rounded-lg shadow-lg cursor-pointer hover:bg-primary"
              :class="{
                'bg-primary glass text-white shadow-lg hover:brightness-90': selectedFlux.length === allFlux.length,
                'text-gray-900 bg-white hover:text-gray-600 hover:bg-gray-50': selectedFlux.length !== allFlux.length
              }
            ">
              See all articles
            </button>
          </li>
        </ul>
    </div>
    <div class="flex flex-wrap justify-center gap-x-8 gap-y-16">
      <CardNews v-for="(item, index) in displayedDataFlux"
        :key="index"
        :title="item.title"
        :link="item.link"
        :image="item.url"
        :desc="item.description"
      />
    </div>
  </div>
        
</template>
