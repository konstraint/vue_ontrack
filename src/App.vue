<script setup>
import { computed, provide, readonly, ref } from 'vue';
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants';
import { 
  generateActivities,
  generateTimelineItems, 
  generateActivitySelectOptions,
  generatePeriodSelectOptions
} from './functions';
import { timelineRef, currentPage } from './router';
import * as keys from './keys';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

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
  activity.secondsToComplete = secondsToComplete || 0;
}

// хотим обеспечить доступ функциям в дочерних компонентах
// первый параметр - ключ, второй - ссылка на объект(функцию или объекты с данными)
// readonly - чтобы нельзя было изменять объекты с данными в дочернем компоненте, для функций не надо
provide(keys.timelineItemsKey, readonly(timelineItems.value));
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

provide(keys.updateTimelineActivitySecondsKey, updateTimelineActivitySeconds);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);

</script>

<template>
  <!-- <TheHeader @navigate="goTo($event)" /> -->
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
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
  <TheNav />
  <!-- прокидываем кастомный аттрибут (пропс)-->
</template>
