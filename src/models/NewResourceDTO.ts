import ResourceDTO from "./ResourceDTO";

export default class NewResourceDTO extends ResourceDTO {
    categoryID: number;

    constructor(title: string, description: string, link: string, categoryID: number) {
        super(title, description, link);

        this.categoryID = categoryID;
    }
}