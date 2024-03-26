import { computed, ref, watchEffect } from "vue";
import {
    HUNDRED_PERCENT,
    MILLISECONDS_IN_SECOND,
    SECONDS_IN_DAY,
    SECONDS_IN_HOUR,
    SECONDS_IN_MINUTE
} from "./constants";

function calcSecondsSinceMidnight() {
    const now = new Date();
    return now.getHours() * SECONDS_IN_HOUR + now.getMinutes() * SECONDS_IN_MINUTE + now.getSeconds()
}

const secondsSinceMidnight = ref(calcSecondsSinceMidnight());

export const secondsSinceMidnigthInPercent = computed(() =>
    secondsSinceMidnight.value * HUNDRED_PERCENT / SECONDS_IN_DAY
);

watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
        secondsSinceMidnight.value = 0
    }
})    

let timer = null;

export function startTimer() {
    secondsSinceMidnight.value = calcSecondsSinceMidnight();
    timer = setInterval(() => {
        secondsSinceMidnight.value++
    }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
    clearInterval(timer)
}