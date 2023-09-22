<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import ResourceListing from '@/components/ResourceListing.vue';
import NewResource from '@/components/NewResource.vue';
import ToastOverlay from '@/components/ToastOverlay.vue';
import ResourceDTO from '@/models/ResourceDTO';
import NewResourceDTO from '@/models/NewResourceDTO';
import type ToastDTO from './models/ToastDTO';
import ResourceCategoryDTO from './models/ResourceCategoryDTO';
import ResourceCategory from './components/ResourceCategory.vue';
import ResourceDetails from './components/ResourceDetails.vue';
import DialogOverlay from './components/DialogOverlay.vue';
import DialogButtonDTO from './models/DialogButtonDTO';

@Component({
  components: {
    ResourceListing,
    NewResource,
    ToastOverlay,
    ResourceCategory,
    DialogOverlay,
    ResourceDetails
  }
})
class App extends Vue {
  resourceCategories: ResourceCategoryDTO[] = [
    new ResourceCategoryDTO('Technologies', 0, [
      new ResourceDTO('Vue.js', 'The official Vue.js website', 'https://vuejs.org/'),
      new ResourceDTO('Node.js', 'The official Node.js website', 'https://nodejs.org/')
    ]),
    new ResourceCategoryDTO('Forums', 1, [
      new ResourceDTO('Stack Overflow', 'A website for programming Q&A', 'https://stackoverflow.com/')
    ])
  ];

  selectedResource: ResourceDTO | null = null;

  toasts: ToastDTO[] = [];

  currentPage: string = 'resource-listing';

  redirectDialogOpen: boolean = false;
  redirectDialogLink: string = '';

  dialogButtons: DialogButtonDTO[] = [];

  setActivePage(page: string): void {
    this.currentPage = page;
  }

  addResource(newResource: NewResourceDTO): void {
    let resource = new ResourceDTO(newResource.title, newResource.description, newResource.link, newResource.id)

    let category = this.resourceCategories.find(x => x.id === newResource.categoryID);
    category?.resources.push(resource);
  }

  deleteResource(resource: ResourceDTO): void {
    this.resourceCategories.forEach(category => {
      category.resources = category.resources.filter(x => x.id !== resource.id);
    });
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

  openResource(resource: ResourceDTO) {
    this.selectedResource = resource;
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
    <ResourceDetails v-if="selectedResource !== undefined" :resource="selectedResource" />
    <ResourceListing :resourceCategories="resourceCategories" @deleteResource="deleteResource" @resourceClick="openResource" @addToast="addToast" />
  </main>

  <main v-if="currentPage === 'new-resource'">
    <NewResource :resourceCategories="resourceCategories" @addResource="addResource" @addCategory="addCategory" @addToast="addToast" @removeToast="removeToast" />
  </main>

  <ToastOverlay :toasts="toasts" @removeToast="removeToast" />

  <DialogOverlay :isOpen="redirectDialogOpen" :text="redirectDialogText" :buttons="dialogButtons"
  @onButtonClick="closeRedirectDialog()" />
</template>

<style scoped>
header, main {
  color: white;
}

main {
  display: flex;
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