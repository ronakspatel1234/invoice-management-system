export class ItemDescriptionData {
    product: Product[];
    itemCalculation: ItemCalculation;
}

export class Product {
    id: number;
    qty: number;
}

export class ItemCalculation {
    total: number;
    // subTotal: number;
    discount: number;
    cgst: number;
    sgst: number;
    grandTotal: string;

}

export enum Mode {
    Edit = 0,
    Add = 1,
    View = 2,
}