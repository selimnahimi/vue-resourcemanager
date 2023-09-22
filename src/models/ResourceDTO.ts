export default class ResourceDTO {
    public id: number;
    public title: string;
    public description: string;
    public link: string;
    public categoryID: number;

    constructor(title: string, description: string, link: string, categoryID: number) {
        this.id = Math.floor(Math.random() * 1000);
        this.title = title;
        this.link = link;
        this.description = description;
        this.categoryID = categoryID;
    }
}