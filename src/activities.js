import { computed, ref } from 'vue'
import { id } from './functions'
import { SECONDS_IN_HOUR } from './constants'

function generateActivities() {
    return ['Coding', 'Training', 'Reading'].map((name, hour) => ({
        id: id(),
        name,
        secondsToComplete: hour * SECONDS_IN_HOUR
    }))
}

function generateActivitySelectOptions() {
    return activities.value.map((activity) => ({ value: activity.id, label: activity.name }))
}

export const activities = ref(generateActivities())

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
