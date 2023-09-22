<script lang="ts">
import Resource from '@/components/Resource.vue';
import type ResourceCategoryDTO from '@/models/ResourceCategoryDTO';
import type ResourceDTO from '@/models/ResourceDTO';
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator';
import draggable from 'vuedraggable';

@Component({
    components: {
        Resource,
        draggable
    }
})
class ResourceCategory extends Vue {
    @Prop({ required: true })
    category!: ResourceCategoryDTO;

    @Prop({ default: [] })
    resources!: ResourceDTO[];

    filterResources() {
        return this.resources.filter(x => x.categoryID === this.category.id);
    }

    open() {

    }

    close() {

    }

    @Emit
    resourceClick(resource: ResourceDTO) {
        return resource;
    }
}

export default toNative(ResourceCategory);
</script>

<template>
<div class="toggle">
    <h2>{{ category.name }}</h2>
</div>
<div class="content">
    <draggable v-model="resources" group="categories">
        <template #item="{ element: resource }">
            <Resource draggable="true" @click="resourceClick(resource)" :resource="resource" />
        </template>
    </draggable>
</div>
</template>

<style scoped>
h2 {
    color: #5B0888;
}
</style>