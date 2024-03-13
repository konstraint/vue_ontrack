<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants';

</script>

<template>

  <TheHeader />

  <main class="flex flex-grow flex-col">
      <TheTimeline v-show="currentPage===PAGE_TIMELINE" />
      <TheActivities v-show="currentPage===PAGE_ACTIVITIES" />
      <TheProgress v-show="currentPage===PAGE_PROGRESS" />
      <!-- v-show туглит свойство display, а v-if - вообще не рендерит элемент если значение false -->
  </main>

  <TheNav />

</template>
