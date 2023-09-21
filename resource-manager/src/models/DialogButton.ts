export default class DialogButton {
    public text: string;
    public onClick: () => void;

    constructor(text: string, onClick?: () => void) {
        this.text = text;
        this.onClick = onClick || this.doNothing;
    }

    doNothing() {}
}