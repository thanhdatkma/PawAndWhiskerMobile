export interface CategoryModel {
    id: string;
    name: string;
    iconName: string;
    itemCount?: number;
    image?: string;
    children?: CategoryModel[];
}