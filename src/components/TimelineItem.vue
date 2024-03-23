<script setup>
    import { inject } from 'vue';
    import { isTimelineItemValid, isUndefined } from '../validators';
    import BaseSelect from './BaseSelect.vue';
    import TimelineHour from './TimelineHour.vue';    
    import TimelineStopwatch from './TimelineStopwatch.vue';
    import { activitySelectOptionsKey, setTimelineItemActivityKey } from '../keys';

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

    const activitySelectOptions = inject(activitySelectOptionsKey);

    const setTimelineItemActivity = inject(setTimelineItemActivityKey);

    const emit = defineEmits({
        scrollToHour: isUndefined,
    });

</script>

<template>
    <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
        <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />

        <BaseSelect 
            placeholder="Rest"
            :selected="timelineItem.activityId" 
            :options="activitySelectOptions" 
            @select="setTimelineItemActivity(timelineItem, $event)"
        />

        <TimelineStopwatch :timeline-item="timelineItem" />
    </li>
</template>