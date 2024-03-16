<script setup>
    import { TrashIcon } from '@heroicons/vue/24/outline';
    import BaseButton from './BaseButton.vue';
    import BaseSelect from './BaseSelect.vue';
    import { ref } from 'vue';
    import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants';
    import { isActivityValid, isUndefined } from '../validators';

    defineProps({
        activity: {
            type: Object,
            required: true,
            validator: isActivityValid
        }
    });

    const secondsToComplete = ref(0);

    const emit = defineEmits({
        delete: isUndefined
    })

</script>

<template>
    <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
                <TrashIcon class="h-8"/>
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div>
            <BaseSelect 
                class="font-mono" 
                placeholder="h:mm" 
                :selected="secondsToComplete" 
                :options="PERIOD_SELECT_OPTIONS"
                @select="secondsToComplete = $event"
            />
        </div>
    </li>    
</template>