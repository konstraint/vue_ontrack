<script setup>
    import { onActivated } from 'vue';
    import { scrollToHour, scrollToCurrentHour, timelineItems, timelineItemRefs } from '../timeline-items';    
    import TimelineItem from '../components/TimelineItem.vue';

    //defineExpose({scrollToHour});  // предоставляем доступ к функции scrollToHour компоненту-родителю

    /* дожидается когда все компоненты отрендерятся
    watchPostEffect(async () => {
        //debugger;
        // когда переходим с другой страницы на страницу с таймерами, то делаем, чтобы переход к текущему часу был мгновенным
        if (currentPage.value === PAGE_TIMELINE) {
            
            await nextTick()

            //debugger
            scrollToCurrentHour(false);
            //debugger
        }
    });
    */

    /* отрабатывает, когда компонент становится активным, т.к. теперь он динамический и рендерится по условию
    поэтому watchPostEffect больше не нужен - т.е. когда перейдем на страницу с таймерами, 
    то понятно, что надо скролить без анимации к текущему часу
    кроме того нужно было ждать формирование dom и рендеринг, а теперь мы точно понимаем, что перешли на страницу с таймерами
    с другой страницы
    */
    
    onActivated(scrollToCurrentHour)

</script>

<template>
    <div class="mt-7">
        <ul>
            <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem"
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour(timelineItem.hour)"
            />
        </ul>
    </div>
</template>