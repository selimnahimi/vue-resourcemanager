<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class Toast extends Vue {
    @Prop({ default: '' })
    text?: string;

    @Prop({ default: 'ok' })
    type?: 'ok' | 'warn' | 'err';
}

export default toNative(Toast);
</script>

<template>
<div :class="type">
    <p>{{ text }}</p>
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
    background-color: green;
}

.warn {
    background-color: yellow;
}

.err {
    background-color: red;
}
</style>