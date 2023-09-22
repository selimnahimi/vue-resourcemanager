<script lang="ts">
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator'
import ResourceDTO from '@/models/ResourceDTO';
import DialogButtonDTO from '@/models/DialogButtonDTO';
import DialogOverlay from '@/components/DialogOverlay.vue';
import ToastDTO from '@/models/ToastDTO';

@Component({
    name: 'ResourceListing',
    components: {
        DialogOverlay
    }
})
class ResourceListing extends Vue {
    @Prop({
        default: []
    })
    resources!: ResourceDTO[];

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
        <div class="resource" v-for="resource in resources" :key="resource.title"
        @click="openRedirectDialog(resource)">
            <h2>{{ resource.title }}</h2>
            <p>{{ resource.description }}</p>
        </div>
    </div>

    <DialogOverlay :isOpen="redirectDialogOpen" :text="redirectDialogText" :buttons="dialogButtons"
    @onButtonClick="closeRedirectDialog()" />
</template>

<style scoped>

.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem;
}

.resource {
    flex: 1 40%;
    margin: 1rem;
    padding: 1rem 1rem;

    background-color: #9D76C1;
    color: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);

    border: 1px solid;
    border-color: transparent;

    transition: all .3s;
}

.resource:hover {
    background-color: #E5CFF7;
    color: black;

    border-color: #9D76C1;
    cursor: pointer;

    transition: all .3s;
}

.resource h2 {
    color: white;

    transition: color .3s;
}

.resource:hover h2 {
    color: #5B0888;

    transition: color .3s;
}
</style>
