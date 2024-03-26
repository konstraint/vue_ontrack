import { computed, onActivated, onDeactivated, ref, watchEffect } from "vue";
import {
    HUNDRED_PERCENT,
    MILLISECONDS_IN_SECOND,
    SECONDS_IN_DAY,
    SECONDS_IN_HOUR,
    SECONDS_IN_MINUTE
} from "../constants";

function calcSecondsSinceMidnight() {
    const now = new Date();
    return now.getHours() * SECONDS_IN_HOUR + now.getMinutes() * SECONDS_IN_MINUTE + now.getSeconds()
}

export function useSecondsSinceMidnight() {
    const secondsSinceMidnight = ref(calcSecondsSinceMidnight());

    const secondsSinceMidnigthInPercent = computed(() =>
        secondsSinceMidnight.value * HUNDRED_PERCENT / SECONDS_IN_DAY
    );

    watchEffect(() => {
        if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
            secondsSinceMidnight.value = 0
        }
    })    

    let timer = null;

    onActivated(() => {
        secondsSinceMidnight.value = calcSecondsSinceMidnight();
        timer = setInterval(() => {
            secondsSinceMidnight.value++
        }, MILLISECONDS_IN_SECOND)
    });

    onDeactivated(() => clearInterval(timer));

    return {
        secondsSinceMidnigthInPercent
    }
}