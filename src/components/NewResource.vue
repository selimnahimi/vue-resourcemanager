<script lang="ts">
import Toast from '@/components/Toast.vue';
import NewResourceDTO from '@/models/NewResourceDTO';
import ResourceCategoryDTO from '@/models/ResourceCategoryDTO';
import ToastDTO from '@/models/ToastDTO';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component({
    components: {
        Toast
    }
})
class NewResource extends Vue {
    private urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi);

    @Prop({ default: [] })
    resourceCategories!: ResourceCategoryDTO[];

    title: string = '';
    desc: string = '';
    link: string = '';
    categoryID: number = 0;
    newCategoryName: string = '';

    toasts: ToastDTO[] = [];

    tryAddResource() {
        let errorText: string | undefined = undefined;
        if (this.title === '')
            errorText = 'The title can\'t be empty!'

        if (this.link === '')
            errorText = 'The link can\'t be empty!';

        if (!this.urlRegex.test(this.link))
            errorText = 'The link is invalid!';

        if (this.isNewCategory() && this.newCategoryName === '')
            errorText = 'The category name can\'t be empty!';

        if (errorText) {
            this.addToast(
                new ToastDTO(errorText, 'err')
            );

            return;
        }

        if (this.isNewCategory()) {
            this.addCategory();
        }

        this.addResource();
    }

    @Emit
    addCategory() {
        this.addToast(
            new ToastDTO(`Succesfully created category "${this.newCategoryName}"!`, 'ok')
        )

        return new ResourceCategoryDTO(this.newCategoryName);
    }

    @Emit
    addResource() {
        this.addToast(
            new ToastDTO(`Successfully added ${this.title}!`, 'ok')
        );

        if (this.isNewCategory()) {
            let newestCategory = this.getLastCategory();
            this.categoryID = newestCategory?.id || 0;
        }

        return new NewResourceDTO(this.title, this.desc, this.link, this.categoryID);
    }

    @Emit
    addToast(toast: ToastDTO) {
        return toast;
    }

    @Emit
    removeToast(toast: ToastDTO) {
        return toast;
    }

    private isNewCategory(): boolean {
        return this.categoryID === -1;
    }

    private getLastCategory(): ResourceCategoryDTO | undefined {
    if (this.resourceCategories.length === 0)
        return undefined;

    return this.resourceCategories[this.resourceCategories.length-1];
    }
}

export default toNative(NewResource);
</script>

<template>

<div class="wrapper">
    <input placeholder="Title" class="title" v-model="title">
    <input placeholder="Description" class="description" v-model="desc">
    <input placeholder="Link" class="link" v-model="link">
    <select class="category" v-model="categoryID">
        <option v-for="category in resourceCategories" :value="category.id" :key="category.id">{{ category.name }}</option>
        <option :value="-1">New Category...</option>
    </select>
    <input v-if="categoryID === -1" placeholder="Category Name" class="category-name" v-model="newCategoryName">
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
