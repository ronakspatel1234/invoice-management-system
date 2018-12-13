/**
 * @author Sonal Prajapati
  @prop id: it return  number type value
 * @prop expiryDate it return string type value
 * * @prop issueDate it return string type value
 * * @prop grandTotal it return number type value
 * * @prop cgst  it return number type value
 * * @prop sgst it return number type value
 */

export class Quotation {
    id: number;
    customerId: number;
    grandTotal: number;
    expiryDate: string;
    issueDate: string;
    quotationNumber;
    discount: number;
    cgst: number;
    sgst: number;
}
