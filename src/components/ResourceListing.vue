<script lang="ts">
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator'
import ResourceDTO from '@/models/ResourceDTO';
import DialogButtonDTO from '@/models/DialogButtonDTO';
import ToastDTO from '@/models/ToastDTO';
import DialogOverlay from '@/components/DialogOverlay.vue';
import Resource from '@/components/Resource.vue';
import type ResourceCategoryDTO from '@/models/ResourceCategoryDTO';
import ResourceCategory from './ResourceCategory.vue';

@Component({
    name: 'ResourceListing',
    components: {
        DialogOverlay,
        Resource,
        ResourceCategory
    }
})
class ResourceListing extends Vue {
    @Prop({ default: [] })
    resourceCategories!: ResourceCategoryDTO[];

    redirectDialogOpen: boolean = false;
    redirectDialogLink: string = '';

    dialogButtons: DialogButtonDTO[] = [];

    openRedirectDialog(resource: ResourceDTO) {
        this.redirectDialogLink = resource.link;
        this.redirectDialogOpen = true;
        
        this.dialogButtons = [];
        this.dialogButtons.push(new DialogButtonDTO('Visit', () => window.open(resource.link, '_blank')))
        this.dialogButtons.push(new DialogButtonDTO('Delete', () => this.deleteResource(resource)))
        this.dialogButtons.push(new DialogButtonDTO('Cancel'))
    }

    closeRedirectDialog() {
        this.redirectDialogOpen = false;
    }

    get redirectDialogText() {
        return 'Do you want to open "' + this.redirectDialogLink + '"?';
    }

    @Emit
    deleteResource(resource: ResourceDTO) {
        this.addToast(
            new ToastDTO(`Successfully deleted ${resource.title}!`, 'warn')
        );

        return resource;
    }

    @Emit
    addToast(toast: ToastDTO) {
        return toast;
    }
}

export default toNative(ResourceListing);

</script>

<template>
    <div class="wrapper">
        <ResourceCategory v-for="category in resourceCategories" :key="category.id" :category="category" @resourceClick="openRedirectDialog" />
    </div>

    <DialogOverlay :isOpen="redirectDialogOpen" :text="redirectDialogText" :buttons="dialogButtons"
    @onButtonClick="closeRedirectDialog()" />
</template>

<style scoped>

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
}
</style>
