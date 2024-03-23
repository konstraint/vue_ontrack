<script setup>
import { currentPage, routes } from './router';
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import { KeepAlive } from 'vue';

/* хотим обеспечить доступ функциям в дочерних компонентах
   первый параметр - ключ, второй - ссылка на объект(функцию или объекты с данными)
   readonly - чтобы нельзя было изменять объекты с данными в дочернем компоненте, для функций не надо
здесь обеспечен доступ к начальной версии activitySelectOptions и дальнейшие изменения массива activitySelectOptions 
не будут видны дочерним компонентам
хотя и activitySelectOptions computed св-во, зависящее от реактивной переменной activities
и чтобы сохранить реактивность даем доступ к самой реактивной переменной
*/
//provide(keys.timelineItemsKey, readonly(timelineItems.value));
//provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
/*
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

provide(keys.updateTimelineActivitySecondsKey, updateTimelineActivitySeconds);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
});
*/

</script>

<template>
  <!-- <TheHeader @navigate="goTo($event)" /> -->
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <!--
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
    -->
    <!-- v-show туглит свойство display, а v-if - вообще не рендерит элемент если значение false -->
    
    <!--компоненты страниц теперь не рендерятся одновременно, а в зависимости от текущец страницы рендерится один компонент
    возникает проблема с тем, что теряется его состояние, которое надо кэшировать
    Компонент KeepAlive закэширует отрендеренные компоненты, которые будут удаляться при переходе на страницы
    -->
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>

  <!-- <TheNav :current-page="currentPage" @navigate="goTo($event)" /> -->
  <TheNav />
  <!-- прокидываем кастомный аттрибут (пропс)-->
</template>
