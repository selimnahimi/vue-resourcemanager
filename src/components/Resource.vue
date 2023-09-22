<script lang="ts">
import type ResourceDTO from '@/models/ResourceDTO';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class Resource extends Vue {
    @Prop({ required: true })
    resource!: ResourceDTO;
}

export default toNative(Resource);
</script>

<template>
<div class="resource">
    <h2>{{ resource.title }}</h2>
    <p>{{ resource.description }}</p>
</div>
</template>

<style scoped>
.resource {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
    padding: 0 1rem;

    background-color: #9D76C1;
    color: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);

    border: 2px solid;
    border-color: transparent;

    transition: all .1s;
}

.resource:hover {
    background-color: #9167b8;
    border-color: #E5CFF7;
    cursor: pointer;

    transition: all .1s;
}
</style>