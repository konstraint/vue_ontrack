<script setup>
    import { inject, nextTick, ref } from 'vue';
    import { PlusIcon } from '@heroicons/vue/24/outline';
    import { id } from '../functions';
    import BaseButton from './BaseButton.vue';
    import { createActivityKey } from '../keys';

    const createActivity = inject(createActivityKey);

    // через v-model обеспечим синхронизацию поля ввода и переменной (чтоб не прослушивать oninput и не менять value)
    // и сделаем переменную реактивной, чтобы Vue перерендерил форму после submit, где меняется эта переменная
    const name = ref('');

    async function submit() {
        createActivity({
            id: id(),
            name: name.value,
            secondsToComplete: 0
        });

        name.value = '';

        await nextTick(() => {    // чтобы дождаться обновления DOM, и потом проскроллить страницу
            window.scrollTo(0, document.body.scrollHeight)
        });
    }

</script>

<template>
    <form 
        @submit.prevent="submit" 
        class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4"
    >
        <input
            type="text" 
            class="w-full rounded border px-4 text-xl"
            placeholder="Activity name"
            v-model="name"
        >
        <BaseButton :disabled="name.trim().length === 0">
            <PlusIcon class="h-8"/>
        </BaseButton>
    </form>
</template>