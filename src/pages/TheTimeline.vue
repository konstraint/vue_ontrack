<script setup>
    import { onActivated, onDeactivated } from 'vue';
    import { scrollToCurrentHour, timelineItems, timelineItemRefs } from '../timeline-items';
    import { startTimer, stopTimer } from '../time';   
    import TimelineItem from '../components/TimelineItem.vue';
    import TheTimelineIndicator from '../components/TheTimelineIndicator.vue';

    //defineExpose({scrollToHour});  // предоставляем доступ к функции scrollToHour компоненту-родителю

    /* дожидается когда все компоненты отрендерятся
    watchPostEffect(async () => {
        //debugger;
        // когда переходим с другой страницы на страницу с таймерами, то делаем, чтобы переход к текущему часу был мгновенным
        if (currentPage.value === PAGE_TIMELINE) {
            
            await nextTick()

            //debugger
            scrollToCurrentHour(false);
            //debugger
        }
    });
    */

    /* отрабатывает, когда компонент становится активным, т.к. теперь он динамический и рендерится по условию
    поэтому watchPostEffect больше не нужен - т.е. когда перейдем на страницу с таймерами, 
    то понятно, что надо скролить без анимации к текущему часу
    кроме того нужно было ждать формирование dom и рендеринг, а теперь мы точно понимаем, что перешли на страницу с таймерами
    с другой страницы
    */
    
    onActivated(() => {
        scrollToCurrentHour()
        startTimer()
    });

    onDeactivated(stopTimer);

</script>

<template>
    <div class="relative mt-7">
        <TheTimelineIndicator />
        <ul>
            <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem"
                ref="timelineItemRefs"
            />
        </ul>
    </div>
</template>