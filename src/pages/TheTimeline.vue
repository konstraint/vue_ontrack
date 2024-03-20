<script setup>
    import { nextTick, ref, watchPostEffect } from 'vue';
    import TheTimelineItem from '../components/TimelineItem.vue';
    import {
        validateTimelineItems,
        validateSelectOptions,
        validateActivities,
        isTimelineItemValid,
        isActivityValid,
        isPageValid,
    } from '../validators';
    import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants';

    const props = defineProps({
        timelineItems: {
            required: true,
            type: Array,
            validator: validateTimelineItems
        },
        activitySelectOptions: {
            required: true,
            type: Array,
            validator: validateSelectOptions
        },
        activities: {
            required: true,
            type: Array,
            validator: validateActivities
        },
        currentPage: {
            required: true,
            type: String,
            validator: isPageValid
        }
    });

    const emit = defineEmits({
        setTimelineItemActivity(timelineItem, activity) {
            return [
                isTimelineItemValid(timelineItem),
                isActivityValid(activity),
            ].every(Boolean)
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
            <TheTimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem"
                :activity-select-options="activitySelectOptions"
                :activities="activities"
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour"
                @select-activity="emit('setTimelineItemActivity', timelineItem, $event)" 
            />
        </ul>
    </div>
</template>