<!--
<script>

    /*нужно, чтобы аттрибуты проставлялись там где они написаны, 
    чтобы корневой элемент (в данном случае <li />) его не наследовал из элемента <a />
    */
    export default {
        inheritAttrs: false
    }
</script>
-->

<script setup>
    import { computed } from 'vue';
    import { isNavItemValid } from '../validators';
    import { navigate, currentPage } from '../router';
    import BaseIcon from './BaseIcon.vue';

    const props = defineProps({
        navItem: {
            required: true,
            type: Object,
            validator: isNavItemValid,
        }
    });

    const classes = computed(() => [
        'flex flex-col items-center p-2 text-xs capitalize',
        { 'bg-gray-200 pointer-events-none': currentPage.value === props.navItem.page }
    ]);

</script>

<template>
    <li class="flex-1">
        <!-- <a v-bind="$attrs" :href="`#${page}`"  @click="navigate(page)" :class="classes"> -->
        <!-- при передаче аттрибута class значение добавится, если внутри NavItem элемент уже содержит аттрибут class-->
        <!-- v-on вешаем слушатель на клик по ссылке. поменяется currentPage и class обновится-->            
        <a :href="`#${navItem.page}`" @click="navigate(navItem.page)" :class="classes">
            <BaseIcon :name="navItem.icon" classes="h-6 w-6" />
            {{ navItem.page }}
        </a>
    </li>
</template>
