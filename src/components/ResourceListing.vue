<script lang="ts">
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator'
import ResourceDTO from '@/models/ResourceDTO';
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

    @Emit
    resourceClick(resource: ResourceDTO) {
        return resource;
    }
}

export default toNative(ResourceListing);

</script>

<template>
    <div class="wrapper">
        <ResourceCategory v-for="category in resourceCategories" :key="category.id" :category="category" @resourceClick="resourceClick" />
    </div>
</template>

<style scoped>

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
}
</style>
