<script setup>
    import { NAV_ITEMS } from '../constants';
    import NavItem from './NavItem.vue';
    import { isPageValid } from '../validators';

    defineProps({
        currentPage: {
            required: true,
            type: String,
            validator: isPageValid
        }
    });

    const emit = defineEmits({
        navigate: isPageValid
    });

</script>

<template>
    <nav class="sticky bottom-0 bg-white">
        <ul class="flex items-center justify-around border-t">
            <NavItem v-for="(icon, page) in NAV_ITEMS" 
                :key = "page" 
                :href="`#${page}`" 
                :class="{'bg-gray-200 pointer-events-none': currentPage === page}"
                @click="emit('navigate', page)"
            > 
            <!-- при передаче аттрибута class значение добавится, если внутри NavItem элемент уже содержит аттрибут class-->
            <!-- v-on вешаем слушатель на клик по ссылке. поменяется currentPage и class обновится-->
                <component :is="icon" class="h-6 w-6" />
                {{ page }}
            </NavItem>
        </ul>
  </nav>
</template>