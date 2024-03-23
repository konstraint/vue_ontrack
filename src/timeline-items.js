import { ref } from 'vue'
import { activities } from './activities'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants'
import { currentHour } from './functions'

function generateTimelineItems() {
    return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
        hour,
        activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
        activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,        
        //activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
        //activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,        
    }))
}

export const timelineItems = ref(generateTimelineItems(activities.value))

export function updateTimelineItem(timelineItem, fields) {
    return Object.assign(timelineItem, fields)
}

function hasActivity(timelineItem, activity) {
    return timelineItem.activityId === activity.id
}

export function resetTimelineItemActivities(activity) {
    timelineItems.value
        .filter(timelineItem => hasActivity(timelineItem, activity))
        .forEach(timelineItem => updateTimelineItem(timelineItem, {
            activityId: null,
            activitySeconds: 0
        }))
}

export function getTotalActivitySeconds(activity) {
    return timelineItems.value
        .filter((timelineItem) => hasActivity(timelineItem, activity))
        .reduce((totalSeconds, timelineItem) => {
            return Math.round(totalSeconds + timelineItem.activitySeconds, 0)
        }, 0)
}

export const timelineItemRefs = ref([]); // массив ссылок на компоненты TimelineItem

export function scrollToHour(hour, isSmooth = true) {
    const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;
    el.scrollIntoView({ behavior: isSmooth ? "smooth" : 'instant' });
}

export function scrollToCurrentHour(isSmooth = true) {
    scrollToHour(currentHour(), isSmooth)
}
