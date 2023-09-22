<script lang="ts">
import type ToastDTO from '@/models/ToastDTO';
import Toast from '@/components/Toast.vue';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component({
    components: {
        Toast
    }
})
class ToastOverlay extends Vue {
    @Prop({ default: [] })
    toasts!: ToastDTO[];

    @Emit
    removeToast(toast: ToastDTO) {
        return toast;
    }
}

export default toNative(ToastOverlay);
</script>

<template>
<div class="toast-container">
    <Toast @click="removeToast(toast)" v-for="toast in toasts" :key="toast.id" :toast="toast" />
</div>
</template>

<style>

.toast-container {
    position: absolute;
    width: 600px;
    height: auto;
    bottom: 0;
    right: 0;
}

</style>
