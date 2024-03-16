<script setup>
import { computed, ref } from 'vue';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants';
import { 
  generateActivities, 
  normalizePageHash, 
  generateTimelineItems, 
  generateActivitySelectOptions,
} from './functions';

const currentPage = ref(normalizePageHash()); // делаем переменную реактивной, чтобы перерендерить компонент при ее изменении

function goTo(page) {
  currentPage.value = page;
}

const timelineItems = generateTimelineItems();

const activities = ref(generateActivities());

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity);
}

</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems" 
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      :activities="activities" 
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
    <!-- v-show туглит свойство display, а v-if - вообще не рендерит элемент если значение false -->
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
  <!-- прокидываем кастомный аттрибут (пропс)-->
</template>
