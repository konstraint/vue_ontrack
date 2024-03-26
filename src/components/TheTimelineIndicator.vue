<script setup>
    import { computed, ref } from 'vue';
    import { HUNDRED_PERCENT } from '../constants';
    import { secondsSinceMidnigthInPercent } from '../time';

    const indicatorRef = ref('');

    const topOffset = computed(() => 
        secondsSinceMidnigthInPercent.value * getTimeLineHeight() / HUNDRED_PERCENT
    )

    function getTimeLineHeight() {
        return indicatorRef.value?.parentNode?.getBoundingClientRect().height
    } 

</script>

<template>
    <hr 
        ref="indicatorRef" 
        class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
        :style="{top : `${topOffset}px`}"
    >
</template>