<script lang="ts">

import { Component, Emit, Prop, Vue, toNative } from 'vue-facing-decorator'
import DialogButtonDTO from '@/models/DialogButtonDTO';

@Component
class DialogOverlay extends Vue {
    @Prop({
        default: [
            new DialogButtonDTO('OK')
        ]
    })
    buttons!: DialogButtonDTO[];

    @Prop({
        default: 'Hello World'
    })
    text!: string;

    @Prop({
        default: false
    })
    isOpen!: boolean;

    @Emit
    onButtonClick() {
        
    }

    clickedButton(button: DialogButtonDTO) {
        button.onClick();
        this.onButtonClick();
    }
}

export default toNative(DialogOverlay);

</script>

<template>
    <teleport to="#app" v-if="isOpen">
        <div class="dialog-wrapper">
            <dialog open>
                <p>{{ text }}</p>
                <div class="button-container">
                    <button v-for="button in buttons" :key="button.text"
                    @click="clickedButton(button)">
                        {{ button.text }}
                    </button>
                </div>
            </dialog>
        </div>
    </teleport>
</template>

<style scoped>
.dialog-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;

    left: 0;
    top: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.5);
}

dialog {
    width: 50vw;
    max-width: 400px;
    height: 120px;

    color: black;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;

    border: none;
}

.button-container {
    display: flex;
    justify-content: space-around;
}

button {
    width: 100px;
    height: 30px;
}

</style>
