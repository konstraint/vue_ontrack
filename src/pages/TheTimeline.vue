<script setup>
    import { nextTick, ref, watchPostEffect } from 'vue';
    import { validateTimelineItems, isPageValid } from '../validators';
    import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '../constants';
    import TimelineItem from '../components/TimelineItem.vue';

    const props = defineProps({
        timelineItems: {
            required: true,
            type: Array,
            validator: validateTimelineItems
        },
        currentPage: {
            required: true,
            type: String,
            validator: isPageValid
        }
    });

    defineExpose({  // предоставляем доступ к функции scrollToHour компоненту-родителю
        scrollToHour
    });

    const timelineItemRefs = ref([]); // массив ссылок на компоненты TimelineItem

    // дожидается когда все компоненты отрендерятся
    watchPostEffect(async () => {
        //debugger;
        if (props.currentPage === PAGE_TIMELINE) {
            
            await nextTick()

            //debugger
            scrollToHour(null, false);
            //debugger
        }
    });

    function scrollToHour(hour = null, isSmooth = true) {
        const options = { behavior: isSmooth ? "smooth" : 'instant' }
        hour ??= new Date().getHours();
        if (hour === MIDNIGHT_HOUR) {
            document.body.scrollIntoView();
        } else {
            timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
            //console.log(timelineItemRefs.value[hour - 1].$el);
        }
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
                @scroll-to-hour="scrollToHour"
            />
        </ul>
    </div>
</template>