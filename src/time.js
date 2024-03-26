import { computed, ref } from "vue";
import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY } from "./constants";

export const now = ref(new Date());

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0));

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND);

export const secondsSinceMidnigthInPercent = computed(() =>
    secondsSinceMidnight.value * HUNDRED_PERCENT / SECONDS_IN_DAY
);  

let timer = null;

export function startTimer() {
    now.value = new Date();
    timer = setInterval(() => {
        now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND * 300)
    }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
    clearInterval(timer)
}