<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import ResourceListing from '@/components/ResourceListing.vue';
import NewResource from '@/components/NewResource.vue';
import Resource from '@/models/Resource';

@Component({
  components: {
    ResourceListing,
    NewResource
  }
})
class App extends Vue {
  resources: Resource[] = [
    {
      title: 'Vue.js',
      description: 'The official Vue.js website',
      link: 'https://vuejs.org/'
    },
    {
      title: 'Node.js',
      description: 'The official Node.js website',
      link: 'https://nodejs.org/'
    },
    {
      title: 'Node.js',
      description: 'The official Node.js website',
      link: 'https://nodejs.org/'
    }
  ]

  currentPage: string = 'resource-listing';

  setActivePage(page: string) {
    this.currentPage = page;
  }

  addResource(resource: Resource) {
    this.resources.push(resource);
  }

  deleteResource(link: string) {
    this.resources = this.resources.filter(x => x.link !== link);
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
    <ResourceListing :resources="resources" @onResourceDelete="deleteResource" />
  </main>

  <main v-if="currentPage === 'new-resource'">
    <NewResource @onResourceAdded="addResource" />
  </main>
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
