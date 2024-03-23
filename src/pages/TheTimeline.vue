<script setup>
    import { nextTick, watchPostEffect } from 'vue';
    import { PAGE_TIMELINE } from '../constants';
    import { currentPage } from '../router';
    import { scrollToHour, scrollToCurrentHour, timelineItems, timelineItemRefs } from '../timeline-items';    
    import TimelineItem from '../components/TimelineItem.vue';

    //defineExpose({scrollToHour});  // предоставляем доступ к функции scrollToHour компоненту-родителю

    // дожидается когда все компоненты отрендерятся
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

</script>

<template>
    <div class="mt-7">
        <ul>
            <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem"
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour(timelineItem.hour)"
            />
        </ul>
    </div>
</template>