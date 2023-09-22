<script lang="ts">
import type ResourceDTO from '@/models/ResourceDTO';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';

@Component
class ResourceDetails extends Vue {
    @Prop
    resource!: ResourceDTO;
}

export default toNative(ResourceDetails);
</script>

<template>
    <h1>{{ resource?.title }}</h1>
    <p>{{ resource?.description }}</p>
    <a :href="resource?.link">{{ resource?.link }}</a>
</template>

<style scoped>

</style>