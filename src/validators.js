import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from "./constants"

export function isPageValid(page) {
    return !!NAV_ITEMS[page]
}

export function isTimelineItemValid({ hour }) {
    return isHourValid(hour)
}

export function validateTimelineItems(timelineItems) {
    return timelineItems.every(isTimelineItemValid)
}

export function validateSelectOptions(options) {
    return options.every(isSelectOptionValid)
}

export function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value) {
    return isNumber(value) || isNull(value)
}

function isSelectOptionValid({ value, label }) {
    return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export function isSelectValueValid(value) {
    return isNotEmptyString(value) || isNumberOrNull(value)
}

export function isNull(value) {
    return value === null
}

export function isUndefined(value) {
    return value === undefined
}

export function isNumber(value) {
    return typeof value === 'number'
}

function isString(value) {
    return typeof value === 'string'
}

function isBetween(value, start, end) {
    return value >= start && value <= end
}

export function isHourValid(hour) {
    return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isNotEmptyString(value) {
    return isString(value) && value.length > 0
}

export function isActivityValid({id, name, secondsToComplete}) {
    if (isNull(id)) {
        return true;
    }

    return [
        isNotEmptyString(id),
        isNotEmptyString(name),
        isNumber(secondsToComplete),
    ].every(Boolean)
}

export function validateActivities(activities) {
    return activities.every(isActivityValid)
}

export function isButtonTypeValid(buttonType) {
    return BUTTON_TYPES.includes(buttonType)
}