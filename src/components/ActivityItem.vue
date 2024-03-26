<script setup>
    import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants';
    import { isActivityValid } from '../validators';
    import { deleteActivity, updateActivity } from '../activities';      
    import { resetTimelineItemActivities, timelineItems } from '../timeline-items';
    import { ICON_TRASH } from '../icons';
    import RemainingActivitySeconds from './RemainingActivitySeconds.vue';
    import BaseButton from './BaseButton.vue';
    import BaseSelect from './BaseSelect.vue';
    import BaseIcon from './BaseIcon.vue';

    const props = defineProps({
        activity: {
            type: Object,
            required: true,
            validator: isActivityValid
        },
    });

    function deleteAndResetActivity() {
        deleteActivity(props.activity)
        resetTimelineItemActivities(timelineItems.value, props.activity)
    }

</script>

<template>
    <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity">
                <BaseIcon :name="ICON_TRASH" />
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div class="flex gap-2">
            <BaseSelect 
                class="grow font-mono" 
                placeholder="hh:mm" 
                :selected="activity.secondsToComplete || null" 
                :options="PERIOD_SELECT_OPTIONS"
                @select="updateActivity(activity, { secondsToComplete: $event || 0 });"
            />

            <RemainingActivitySeconds 
                v-if="activity.secondsToComplete"
                :activity="activity"
            />
        </div>
    </li>    
</template>