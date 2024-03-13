<script>
    /*нужно, чтобы аттрибуты проставлялись там где они написаны, 
      чтобы корневой элемент (в данном случае <li />) его не наследовал из элемента <a />
    */  
    export default {
        inheritAttrs: false
    }
</script>

<template>
    <li class="flex-1">
        <a v-bind="$attrs" class="flex flex-col items-center p-2 text-xs capitalize">       
            <slot></slot>
        </a>
    </li>

    <!--
        const provider = new Provider ffffff
        fffff
    -->
</template>