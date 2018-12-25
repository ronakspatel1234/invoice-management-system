
export default class ItemDescriptionUtil {

    static subtraction(myValue, subTotal) {
        let discount = (subTotal * (myValue / 100))
        return discount;
    }
    static addition(myValue, subTotal) {
        let sgst = (subTotal * (myValue / 100))
        return sgst;
    }
    static add(myValue, subTotal) {
        let cgst = (subTotal * (myValue / 100))
        return cgst;
    }
}
