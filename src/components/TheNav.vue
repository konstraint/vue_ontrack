<script setup>
    import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

    import NavItem from './NavItem.vue';

    import { ref } from 'vue';

    import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '../constants'

    const navItems = {
        [PAGE_TIMELINE]: ClockIcon,
        [PAGE_ACTIVITIES]: ListBulletIcon,
        [PAGE_PROGRESS]: ChartBarIcon
    }

    const currentPage = ref(normalizePageHash()); // делаем переменную реактивной, чтобы перерендерить компонент при ее изменении

    function normalizePageHash() {
        const hash = window.location.hash.slice(1);

        if (Object.keys(navItems).includes(hash)) {
            return hash;
        }

        window.location.hash = PAGE_TIMELINE;

        return PAGE_TIMELINE;
    }

</script>

<template>
    <nav class="sticky bottom-0 bg-white">
        <ul class="flex items-center justify-around border-t">
            <NavItem v-for="(icon, page) in navItems" 
                :key = "page" 
                :href="`#${page}`" 
                :class="{'bg-gray-200 pointer-events-none': currentPage === page}"
                @click="currentPage=page"
            > 
            <!-- при передаче аттрибута class значение добавится, если внутри NavItem элемент уже содержит аттрибут class-->
            <!-- v-on вешаем слушатель на клик по ссылке. поменяется currentPage и class обновится-->
                <component :is="icon" class="h-6 w-6" />
                {{ page }}
            </NavItem>
        </ul>
  </nav>
</template>