
<script setup>
    import { ref, watch } from 'vue';
    import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';
    import {
        BUTTON_TYPE_DANGER,
        BUTTON_TYPE_SUCCESS,
        BUTTON_TYPE_WARNING,
        MILLISECONDS_IN_SECOND,
    } from '../constants';
    import { isTimelineItemValid } from '../validators';
    import { currentHour, formatSeconds } from '../functions';
    import { updateTimelineItem } from '@/timeline-items';
    import BaseButton from './BaseButton.vue';

    // достаем по ключу функцию из родительского компонента, к которой хотим получить доступ
    //const updateTimelineActivitySeconds = inject('updateTimelineActivitySeconds');
    //const updateTimelineActivitySeconds = inject(updateTimelineActivitySecondsKey);

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        },
    });

    watch(
        () => props.timelineItem.activityId, // смотрим меняется ли кол-секунд
        () => {
            updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value })
        }
    )

    const seconds = ref(props.timelineItem.activitySeconds);  // обновление секундомера
    const isRunning = ref(false); // запущен ли секундомер
    const isStartButtonDisabled = props.timelineItem.hour !== currentHour()

    function start() { // запуск секундомера
        isRunning.value = setInterval(() => { // каждую секунду нужно обновлять секундомер
            updateTimelineItem(props.timelineItem, { activitySeconds: props.timelineItem.activitySeconds + 1 })
            seconds.value++;
        }, MILLISECONDS_IN_SECOND)
    }

    function stop() { // остановка секундомера
        clearInterval(isRunning.value);
        isRunning.value = false;
    }    

    function reset() { // сброс секундомера
        stop();
        updateTimelineItem(
            props.timelineItem,
            { activitySeconds: props.timelineItem.activitySeconds - seconds.value }
        );
        seconds.value = 0;
    }

</script>

<template>
    <div class="flex w-full gap-2">
        <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
            <ArrowPathIcon class="h-8"/>
        </BaseButton>
        <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
            {{ formatSeconds(seconds) }}
        </div>
        <BaseButton  v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
            <PauseIcon class="h-8"/>
        </BaseButton>
        <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
            <PlayIcon class="h-8"/>
        </BaseButton>
    </div>
</template>