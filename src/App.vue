<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import ResourceListing from '@/components/ResourceListing.vue';
import NewResource from '@/components/NewResource.vue';
import ToastOverlay from '@/components/ToastOverlay.vue';
import ResourceDTO from '@/models/ResourceDTO';
import type ToastDTO from './models/ToastDTO';
import ResourceCategoryDTO from './models/ResourceCategoryDTO';
import ResourceCategory from './components/ResourceCategory.vue';

@Component({
  components: {
    ResourceListing,
    NewResource,
    ToastOverlay,
    ResourceCategory
  }
})
class App extends Vue {
  resourceCategories: ResourceCategoryDTO[] = [
    new ResourceCategoryDTO('Technologies', 0),
    new ResourceCategoryDTO('Forums', 1)
  ];

  resources: ResourceDTO[] = [
    new ResourceDTO('Vue.js', 'The official Vue.js website', 'https://vuejs.org/', 0),
    new ResourceDTO('Node.js', 'The official Node.js website', 'https://nodejs.org/', 0),
    new ResourceDTO('Stack Overflow', 'A website for programming Q&A', 'https://stackoverflow.com/', 1)
  ]

  toasts: ToastDTO[] = [];

  currentPage: string = 'resource-listing';

  setActivePage(page: string): void {
    this.currentPage = page;
  }

  addResource(resource: ResourceDTO): void {
    this.resources.push(resource);
  }

  deleteResource(resource: ResourceDTO): void {
    this.resources = this.resources.filter(x => x.id !== resource.id);
  }

  addToast(toast: ToastDTO): void {
    setTimeout(() => this.removeToast(toast), 3000);

    this.toasts.push(toast);
  }

  removeToast(toast: ToastDTO): void {
    this.toasts = this.toasts.filter(x => x.id !== toast.id)
  }

  addCategory(category: ResourceCategoryDTO): void {
    let lastCategory = this.getLastCategory();
    let newID = lastCategory ? lastCategory.id + 1 : 0;

    category.id = newID;
    this.resourceCategories.push(category);
  }

  private getLastCategory(): ResourceCategoryDTO | undefined {
    if (this.resourceCategories.length === 0)
      return undefined;

    return this.resourceCategories[this.resourceCategories.length-1];
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
    <ResourceListing :resourceCategories="resourceCategories" :resources="resources" @deleteResource="deleteResource" @addToast="addToast" />
  </main>

  <main v-if="currentPage === 'new-resource'">
    <NewResource :resourceCategories="resourceCategories" @addResource="addResource" @addCategory="addCategory" @addToast="addToast" @removeToast="removeToast" />
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