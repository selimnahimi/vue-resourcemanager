<script lang="ts">
import Toast from '@/components/Toast.vue';
import Resource from '@/models/Resource';
import { Component, Emit, Vue, toNative } from 'vue-facing-decorator';

@Component({
    components: {
        Toast
    }
})
class NewResource extends Vue {
    title: string = '';
    desc: string = '';
    link: string = '';

    toasts: {text: string, type: string, id: number}[] = [];

    @Emit
    onResourceAdded() {
        let randomId = Math.floor(Math.random() * 10000);
        this.addToast(`${this.title} was successfully added`, 'ok', randomId);

        setTimeout(() => this.removeToast(randomId), 3000);

        return new Resource(this.title, this.desc, this.link);
    }

    addToast(text: string, type: string, id: number) {
        this.toasts.push({text, type, id});
    }

    removeToast(id: number) {
        this.toasts = this.toasts.filter(x => x.id !== id);
    }
}

export default toNative(NewResource);
</script>

<template>

<div class="toast-container">
    <Toast @click="removeToast(toast.id)" v-for="toast in toasts" :key="toast.id" :text="toast.text" :type="toast.type" />
</div>

<div class="wrapper">
    <input placeholder="Title" class="title" v-model="title">
    <input placeholder="Description" class="description" v-model="desc">
    <input placeholder="Link" class="link" v-model="link">
    <button @click="onResourceAdded()">Add Resource</button>
</div>

</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    width: 500px;
    margin: 1rem;
    font-size: 1.2rem;
}

.title {
    font-size: 2rem;
    font-weight: bold;
}

.link {
    color: blue;
}

.toast-container {
    position: absolute;
    width: 600px;
    height: 100vh;
    top: 0;
    right: 0;
}
</style>