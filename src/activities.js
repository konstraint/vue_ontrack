import { computed, ref } from 'vue'
import { id } from './functions'
import { HUNDRED_PERCENT, SECONDS_IN_HOUR } from './constants'

function generateActivities() {
    return ['Coding', 'Reading', 'Training'].map((name, hour) => ({
        id: id(),
        name,
        secondsToComplete: 15 * 60 //hour * SECONDS_IN_HOUR
    }))
}

function generateActivitySelectOptions() {
    return activities.value.map((activity) => ({ value: activity.id, label: activity.name }))
}

export const activities = ref(generateActivities())

export const trackedActivities = computed(() =>
    activities.value.filter(({secondsToComplete}) => secondsToComplete)
) 

export const activitySelectOptions = computed(() => generateActivitySelectOptions())

export function deleteActivity(activity) {
    activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
    activities.value.push(activity)
}

export function updateActivity(activity, fields) {
    return Object.assign(activity, fields)
}

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
    return Math.floor(trackedSeconds * HUNDRED_PERCENT / secondsToComplete)
}

const totalActivitySecondsToComplete = computed(() => 
    trackedActivities.value.reduce((totalSeconds, activity) => totalSeconds + activity.secondsToComplete, 0)
)

export function calculateCompletionPercentage(totalTrackedSeconds) {
    return Math.floor(totalTrackedSeconds * HUNDRED_PERCENT / totalActivitySecondsToComplete.value)
}
