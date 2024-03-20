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

const timeline = ref();

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  currentPage.value = page;
}

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

function setTimelineItemActivity(timelineItem, activity) {
    timelineItem.activityId = activity.id
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems" 
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      :current-page="currentPage"
      ref="timeline"
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      :activities="activities" 
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
      />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
    <!-- v-show туглит свойство display, а v-if - вообще не рендерит элемент если значение false -->
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
  <!-- прокидываем кастомный аттрибут (пропс)-->
</template>
