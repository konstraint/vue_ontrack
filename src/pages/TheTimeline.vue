<script setup>
    import { nextTick, ref, watchPostEffect } from 'vue';
    import { validateTimelineItems } from '../validators';
    import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../constants';
    import { currentPage } from '../router';
    import TimelineItem from '../components/TimelineItem.vue';
    import { currentHour } from '../functions';

    defineProps({
        timelineItems: {
            required: true,
            type: Array,
            validator: validateTimelineItems
        },
    });

    defineExpose({  // предоставляем доступ к функции scrollToHour компоненту-родителю
        scrollToHour
    });

    const timelineItemRefs = ref([]); // массив ссылок на компоненты TimelineItem

    // дожидается когда все компоненты отрендерятся
    watchPostEffect(async () => {
        //debugger;
        if (currentPage.value === PAGE_TIMELINE) {
            
            await nextTick()

            //debugger
            scrollToHour(null, false);
            //debugger
        }
    });

    function scrollToHour(hour = null, isSmooth = true) {
        hour ??= currentHour();
        const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;
        el.scrollIntoView({ behavior: isSmooth ? "smooth" : 'instant' });
    }

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