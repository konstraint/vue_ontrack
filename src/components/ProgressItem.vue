<script setup>
    import { computed } from 'vue';
    import { calculateActivityCompletionPercentage } from '../activities';
    import { formatSeconds, getProgressColorClass } from '../functions'
    import { isActivityValid } from '../validators';
    import { calculateTrackedActivitySeconds, timelineItems } from '../timeline-items';

    const props = defineProps({
        activity: {
            required: true,
            type: Object,
            validator: isActivityValid
        }
    });

    const progress = computed(() => 
        calculateActivityCompletionPercentage(props.activity, trackedActivitySeconds.value)
    );

    const trackedActivitySeconds = computed(() => 
        calculateTrackedActivitySeconds(timelineItems.value, props.activity)
    )

</script>

<template>
    <li class="flex flex-col gap-1 p-4">
        <div class="truncate text-xl">{{ activity.name }}</div>
        <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
            <div :class="getProgressColorClass(progress)" :style="`width: ${progress}%`"></div>
        </div>
        <div class="flex justify-between font-mono text-sm">
            <span>{{ progress }}%</span>
            <span>
                {{ formatSeconds(trackedActivitySeconds) }} / 
                {{ formatSeconds(activity.secondsToComplete) }}
            </span>
        </div>
    </li>
</template>