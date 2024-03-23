<script setup>
import { computed, provide, ref } from 'vue';
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants';
import { 
  generateActivities,
  generateTimelineItems, 
  generateActivitySelectOptions,
  generatePeriodSelectOptions
} from './functions';

import { timelineRef, currentPage, navigate } from './router';

import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

/*
const currentPage = ref(normalizePageHash()); // делаем переменную реактивной, чтобы перерендерить компонент при ее изменении

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    // через ref-аттрибут дочернего компонента получаем доступ к его функциям 
    timeline.value.scrollToHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  currentPage.value = page;
}

const timelineRef = ref();
*/

const activities = ref(generateActivities());

const timelineItems = ref(generateTimelineItems(activities.value));

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity);
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete;
}

// хотим обеспечить доступ функции updateTimelineActivitySeconds в дочернем компоненте
// первый параметр - ключ, второй - ссылка на функцию
provide('updateTimelineActivitySeconds', updateTimelineActivitySeconds);
provide('timelineItems', timelineItems.value);
provide('activitySelectOptions', activitySelectOptions.value);
provide('periodSelectOptions', generatePeriodSelectOptions());
provide('setTimelineItemActivity', setTimelineItemActivity);
provide('setActivitySecondsToComplete', setActivitySecondsToComplete);
provide('createActivity', createActivity);
provide('deleteActivity', deleteActivity);

</script>

<template>
  <!-- <TheHeader @navigate="goTo($event)" /> -->
  <TheHeader @navigate="navigate" />

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="currentPage"
      ref="timelineRef"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      :activities="activities"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
    <!-- v-show туглит свойство display, а v-if - вообще не рендерит элемент если значение false -->
  </main>

  <!-- <TheNav :current-page="currentPage" @navigate="goTo($event)" /> -->
  <TheNav :current-page="currentPage" @navigate="navigate" />
  <!-- прокидываем кастомный аттрибут (пропс)-->
</template>
