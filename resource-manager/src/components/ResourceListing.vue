<script lang="ts">
import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator'
import Resource from '@/models/Resource';
import DialogOverlay from '@/components/DialogOverlay.vue';
import DialogButton from '@/models/DialogButton';
import { computed, type ComputedRef } from 'vue';

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
    resources!: Resource[];

    redirectDialogOpen: boolean = false;
    redirectDialogLink: string = '';

    dialogButtons: DialogButton[] = [];

    openRedirectDialog(link: string) {
        this.redirectDialogLink = link;
        this.redirectDialogOpen = true;
        
        this.dialogButtons = [];
        this.dialogButtons.push(new DialogButton('Visit', () => window.open(link, '_blank')))
        this.dialogButtons.push(new DialogButton('Delete', () => this.onResourceDelete(link)))
        this.dialogButtons.push(new DialogButton('Cancel'))
    }

    closeRedirectDialog() {
        this.redirectDialogOpen = false;
    }

    get redirectDialogText() {
        return 'Do you want to open "' + this.redirectDialogLink + '"?';
    }

    @Emit
    onResourceDelete(link: string) {
        return link;
    }
}

export default toNative(ResourceListing);

</script>

<template>
    <div class="wrapper">
        <div class="resource" v-for="resource in resources" :key="resource.title"
        @click="openRedirectDialog(resource.link)">
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
