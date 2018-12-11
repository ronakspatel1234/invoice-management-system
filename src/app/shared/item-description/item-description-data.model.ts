export class ItemDescriptionData {

    product : Product;
    discount : number;
    cgst : number;
    sgst : number;
    grandTotal : string;
}

export class Product {
    id : number;
    qty : number
}