<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <p>Chargement...</p>
    </template>
  </Suspense>
</template>
