import { computed } from "vue";
import { calculateActivityCompletionPercentage } from "../activities";
import { getProgressColorClass } from "../functions";
import { calculateTrackedActivitySeconds, timelineItems } from "../timeline-items";

export function useProgress(activity) {
    const trackedActivitySeconds = computed(() => 
        calculateTrackedActivitySeconds(timelineItems.value, activity)
    );

    const percentage = computed(() => 
        calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
    );

    const colorClass = computed(() => getProgressColorClass(percentage.value));

    return {
        percentage,
        trackedActivitySeconds,
        colorClass
    }
}