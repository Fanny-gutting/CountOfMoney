<script setup lang="ts">
  import {
    IconBurger, MainNavElement, IconHome, IconNews, IconPiggyBank, Divider, IconProfil, IconSetting
  } from '@/components'
  import { useAuth } from '@/uses';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const meta = ref(route.meta)

  const { logout, setUser, user } = await useAuth()
  const is_Auth = await setUser()

  watch(() => route.path, () => meta.value = route.meta)

</script>

<template>
  <!-- <div> -->

    <!-- <div class="avatar flex justify-end absolute top-0 right-0 z-50">
      <div class="w-16 rounded-full drop-shadow-xl m-5">
        <router-link to="/profilpage">
          <button>
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin">
          </button>
        </router-link>
      </div>
    </div> -->

    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col justify-start">
        <label for="my-drawer-2" class="bg-transparent border-none drawer-button lg:hidden fixed z-50">
          <IconBurger class="fill-slate-800"/></label>
          <div class="bgTitle">
            <h1 v-if="meta && meta.title" class="text-white font-bold text-3xl lg:text-4xl text-center py-12">{{ meta.title }}</h1>
          </div>
          <router-view class="mt-5 p-4" />
      </div>
      <div class="drawer-side text-gray-300">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <div class="w-60 h-full shadow-md bg-slate-800 px-1">
          <div class="justify-between grid grid-rows-1 h-full pb-10">
            <ul>
              <div>
                <div class="p-4 mt-4 flex items-center">
                  <IconPiggyBank/>
                  <h1 class="font-bold text-xl ml-4">Count of money</h1>
                </div>
              </div>


              <div class="dropdown dropdown-bottom w-full pl-2" v-if="is_Auth">
                <label tabindex="0" class="m-1 cursor-pointer">
                  <div class="flex bg-base-200 bg-opacity-40 p-4 gap-3 max-w-[13rem] rounded-xl overflow-hidden transition-all hover:bg-opacity-50">
                    <div class="avatar placeholder">
                      <div class="bg-warning text-primary-content rounded-full w-12">
                        <span class="font-bold uppercase">{{ user?.username.slice(0, 1) }}</span>
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-semibold">{{ user?.username }}</span>
                      <span class="text-sm text-base-300" v-if="user?.status == 0">Admin</span>
                      <span class="text-sm text-base-300" v-if="user?.status == 1">Membre</span>
                    </div>
                  </div>
                </label>
              
            
                <ul tabindex="0" class="dropdown-content menu bg-[#546070] w-52 shadow-2xl rounded-box">
                  <div class="flex flex-col p-4 mb-2 border-b border-b-slate-500">
                    <span>{{ user?.username }}</span>
                    <span class="text-black text-opacity-70">{{ user?.email }}</span>
                  </div>
                  <li><router-link :to="{ name: 'dashboard' }"><IconHome height="1.5rem" width="1.5rem" />Accueil</router-link></li>
                  <li><router-link :to="{ name: 'profilpage' }"><IconProfil height="1.5rem" width="1.5rem" />Profil</router-link></li>
                  <li v-if="user?.status == 0"><router-link :to="{ name: 'adminpage' }"><IconSetting height="1.5rem" width="1.5rem" />Admin page</router-link></li>
                  <!-- <li><router-link :to="{ name: 'company' }"><IconCog height="1.5rem" width="1.5rem" />Gestion du site</router-link></li> -->
                  <li class="p-4">
                    <button 
                      class="btn btn-error rounded-md hover:bg-opacity-90"
                      @click.prevent="logout"
                    >Déconnexion</button>
                  </li>
                </ul>
              </div>

              <Divider/>

              <MainNavElement :to="{name: 'dashboard'}" label="Dashboard"><IconHome/></MainNavElement>
              <MainNavElement :to="{name: 'cryptonews'}" label="CryptoNews"><IconNews/></MainNavElement>
            </ul>
            <div v-if="!is_Auth" class="flex justify-center gap-5 p-2">
              <router-link to="/login"><button class="btn">Login</button></router-link>
              <router-link to="/signin"><button class="btn">Sign In</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<style scoped>

</style>