<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import ResourceListing from '@/components/ResourceListing.vue';
import NewResource from '@/components/NewResource.vue';
import ToastOverlay from '@/components/ToastOverlay.vue';
import ResourceDTO from '@/models/ResourceDTO';
import type ToastDTO from './models/ToastDTO';

@Component({
  components: {
    ResourceListing,
    NewResource,
    ToastOverlay
  }
})
class App extends Vue {
  resources: ResourceDTO[] = [
    new ResourceDTO('Vue.js', 'The official Vue.js website', 'https://vuejs.org/'),
    new ResourceDTO('Node.js', 'The official Node.js website', 'https://nodejs.org/'),
    new ResourceDTO('Stack Overflow', 'A website for programming Q&A', 'https://stackoverflow.com/')
  ]

  toasts: ToastDTO[] = [];

  currentPage: string = 'resource-listing';

  setActivePage(page: string) {
    this.currentPage = page;
  }

  addResource(resource: ResourceDTO) {
    this.resources.push(resource);
  }

  deleteResource(resource: ResourceDTO) {
    this.resources = this.resources.filter(x => x.id !== resource.id);
  }

  addToast(toast: ToastDTO) {
    setTimeout(() => this.removeToast(toast), 3000);

    this.toasts.push(toast);
  }

  removeToast(toast: ToastDTO) {
    this.toasts = this.toasts.filter(x => x.id !== toast.id)
  }
}

export default toNative(App);

</script>

<template>
  <header>
    <h1>Resource Manager</h1>
    <nav>
      <button @click="setActivePage('resource-listing')">Resources</button>
      <button @click="setActivePage('new-resource')">Add New</button>
    </nav>
  </header>

  <main v-if="currentPage === 'resource-listing'">
    <ResourceListing :resources="resources" @deleteResource="deleteResource" @addToast="addToast" />
  </main>

  <main v-if="currentPage === 'new-resource'">
    <NewResource @addResource="addResource" @addToast="addToast" @removeToast="removeToast" />
  </main>

  <ToastOverlay :toasts="toasts" @removeToast="removeToast" />
</template>

<style scoped>
header, main {
  color: white;
}

header {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  background-color: #5B0888;
}

button {
  width: 100px;
  height: 30px;
  margin: 1rem;
}
</style>
@/models/ResourceDTO