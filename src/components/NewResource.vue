<script lang="ts">
import Toast from '@/components/Toast.vue';
import ResourceDTO from '@/models/ResourceDTO';
import ToastDTO from '@/models/ToastDTO';
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

    private urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi);

    toasts: {text: string, type: string, id: number}[] = [];

    tryAddResource() {
        let errorText: string | undefined = undefined;
        if (this.title === '')
            errorText = 'The title can\'t be empty!'

        if (this.link === '')
            errorText = 'The link can\'t be empty!';

        if (!this.urlRegex.test(this.link))
            errorText = 'The link is invalid!';

        if (errorText) {
            this.addToast(
                new ToastDTO(errorText, 'err')
            );

            return;
        }

        this.addResource();
    }

    @Emit
    addResource() {
        this.addToast(
            new ToastDTO(`Successfully added ${this.title}!`, 'ok')
        );

        return new ResourceDTO(this.title, this.desc, this.link);
    }

    @Emit
    addToast(toast: ToastDTO) {
        return toast;
    }

    @Emit
    removeToast(toast: ToastDTO) {
        return toast;
    }
}

export default toNative(NewResource);
</script>

<template>

<div class="wrapper">
    <input placeholder="Title" class="title" v-model="title">
    <input placeholder="Description" class="description" v-model="desc">
    <input placeholder="Link" class="link" v-model="link">
    <button @click="tryAddResource()">Add Resource</button>
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
</style>
