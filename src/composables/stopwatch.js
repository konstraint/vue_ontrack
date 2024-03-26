import { ref } from "vue";
import { MILLISECONDS_IN_SECOND } from "@/constants";

// отвечает только за изменения секундомера
export function useStopWatch(initialSeconds) {
    const temp = 120;

    const seconds = ref(initialSeconds);  // обновление секундомера
    const isRunning = ref(false); // запущен ли секундомер

    function start() { // запуск секундомера
        isRunning.value = setInterval(() => { // каждую секунду нужно обновлять секундомер
            seconds.value += temp;
        }, MILLISECONDS_IN_SECOND)
    }

    function stop() { // остановка секундомера
        clearInterval(isRunning.value);
        isRunning.value = false;
    }    

    function reset() { // сброс секундомера
        stop();
        seconds.value = 0;     
    }

    return {
        start,
        stop,
        reset,
        seconds,
        isRunning
    }
}