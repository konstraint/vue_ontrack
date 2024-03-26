<script setup>
    import { computed, ref, onActivated, onDeactivated } from 'vue';
    import { HUNDRED_PERCENT } from '../constants';
    import { useSecondsSinceMidnight } from '../composables/seconds-since-midnight';
    import { secondsSinceMidnigthInPercent, startTimer, stopTimer } from '../time';

    const indicatorRef = ref('');

    //const { secondsSinceMidnigthInPercent } = useSecondsSinceMidnight()


    const topOffset = computed(() => 
        secondsSinceMidnigthInPercent.value * getTimeLineHeight() / HUNDRED_PERCENT
    )

    function getTimeLineHeight() {
        return indicatorRef.value?.parentNode?.getBoundingClientRect().height
    }

    onActivated(startTimer);
    onDeactivated(stopTimer);    

</script>

<template>
    <hr 
        ref="indicatorRef" 
        class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
        :style="{top : `${topOffset}px`}"
    >
</template>