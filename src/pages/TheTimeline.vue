<script setup>
    import TheTimelineItem from '../components/TimelineItem.vue';
    import { validateTimelineItems } from '../validators';

    defineProps({
        timelineItems: {
            required: true,
            type: Array,
            validator: validateTimelineItems
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
            />
        </ul>
    </div>
</template>