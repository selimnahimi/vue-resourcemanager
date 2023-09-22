export default class ToastDTO {
    text: string;
    type: 'ok' | 'err' | 'warn';
    id: number;

    constructor(text: string, type: 'ok' | 'err' | 'warn') {
        this.id = Math.floor(Math.random() * 1000);
        this.text = text;
        this.type = type;
    }
}