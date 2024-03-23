import { ref } from 'vue';
import { normalizePageHash } from './functions';
import { PAGE_TIMELINE } from './constants';

export const timelineRef = ref();

export const currentPage = ref(normalizePageHash());

export function navigate(page) {
    if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
        // через ref-аттрибут дочернего компонента получаем доступ к его функциям 
        timelineRef.value.scrollToHour();
    }
  
    if (page !== PAGE_TIMELINE) {
        document.body.scrollIntoView();
    }
  
    currentPage.value = page;
}