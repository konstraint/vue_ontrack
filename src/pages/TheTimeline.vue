<script setup>
    import TheTimelineItem from '../components/TimelineItem.vue';
    import {
        validateTimelineItems,
        validateSelectOptions,
        validateActivities,
        isTimelineItemValid,
        isActivityValid,
    } from '../validators';

    defineProps({
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
                @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
            />
        </ul>
    </div>
</template>