export default class Resource {
    public title: string;
    public description: string;
    public link: string;

    constructor(title: string, description: string, link: string) {
        this.title = title;
        this.link = link;
        this.description = description;
    }
}