export class Items {
    id : number;
    field : Field
};

export class Field {
    description : string;
    uom : string;
    unitPrice : string;
    qty: number;
    total:number
}