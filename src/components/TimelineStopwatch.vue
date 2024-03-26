<script setup>
    import { watch, watchEffect } from 'vue';
    import {
        BUTTON_TYPE_DANGER,
        BUTTON_TYPE_SUCCESS,
        BUTTON_TYPE_WARNING,
    } from '../constants';
    import { useStopWatch } from '../composables/stopwatch';
    import { isTimelineItemValid } from '../validators';
    import { currentHour, formatSeconds } from '../functions';
    import { updateTimelineItem } from '../timeline-items';
    import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '../icons';
    import BaseButton from './BaseButton.vue';
    import BaseIcon from './BaseIcon.vue';

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

    const { start, stop, reset, seconds, isRunning } = useStopWatch(props.timelineItem.activitySeconds);

    // watch(
    //     () => props.timelineItem.activityId, // смотрим меняется ли активность для таймера
    //     updateTimelineItemActivitySeconds
    // );

    // отслеживает измения всех реактивных переменных использующихся в передаваемом замыкании
    watchEffect(() => 
        updateTimelineItem(props.timelineItem, {
            activitySeconds: seconds.value 
        })
    );

</script>

<template>
    <div class="flex w-full gap-2">
        <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
            <BaseIcon :name="ICON_ARROW_PATH" />
        </BaseButton>
        <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
            {{ formatSeconds(timelineItem.activitySeconds) }}
        </div>
        <BaseButton  v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
            <BaseIcon :name="ICON_PAUSE" />
        </BaseButton>
        <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="timelineItem.hour !== currentHour()" @click="start">
            <BaseIcon :name="ICON_PLAY" />
        </BaseButton>
    </div>
</template>