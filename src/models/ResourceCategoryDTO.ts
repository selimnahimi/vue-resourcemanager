import ResourceDTO from '@/models/ResourceDTO';

export default class ResourceCategoryDTO {
    id: number;
    name: string;
    resources: ResourceDTO[];

    constructor(name: string, id?: number, resources?: ResourceDTO[]) {
        this.id = id || 0;
        this.name = name;
        this.resources = resources || [];
    }
}