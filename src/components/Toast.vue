<script lang="ts">
import type ToastDTO from '@/models/ToastDTO';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class Toast extends Vue {
    @Prop({required: true})
    toast!: ToastDTO;
}

export default toNative(Toast);
</script>

<template>
<div :class="toast.type">
    <p>{{ toast.text }}</p>
</div>
</template>

<style scoped>
div {
    width: 550px;
    display: flex;
    justify-content: center;
    margin: 10px;
    
    cursor: pointer;
}

.ok {
    background-color: greenyellow;
}

.warn {
    background-color: yellow;
}

.err {
    background-color: red;
}
</style>
