<script setup>
    import { isActivityValid, isNumber, validateActivities } from '../validators';
    import ActivityItem from '../components/ActivityItem.vue';
    import TheActivityForm from '@/components/TheActivityForm.vue';
    import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue';

    defineProps({
        activities: {
            type: Array,
            required: true,
            validator: validateActivities
        }
    });

    const emit = defineEmits({
        deleteActivity: isActivityValid,
        createActivity: isActivityValid,
        setActivitySecondsToComplete(activity, secondsToComplete) {
            return isActivityValid(activity) && isNumber(secondsToComplete)     
        }
    });

    function setSecondsTocomplete(activity, secondsToComplete) {
        emit('setActivitySecondsToComplete', activity, secondsToComplete)
    }

</script>

<template>
    <div class="flex flex-col grow">
        <ul v-if="activities.length > 0" class="divide-y grow">
            <ActivityItem 
                v-for="activity in activities" 
                :key="activity.id" 
                :activity="activity" 
                @delete="emit('deleteActivity', activity)"
                @set-seconds-tocomplete="setSecondsTocomplete(activity, $event)"
            />
        </ul>

        <TheActivitiesEmptyState v-else/>

        <TheActivityForm @submit="emit('createActivity', $event)"/>
        
    </div>
</template>