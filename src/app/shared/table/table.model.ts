/**
 * @description it is used forheader
 * @prop name it return string type value
 * @prop key it is return string type value
 */
export class Header {
    name: string;
    Key: string;
}
/**
 * @description enum is used for user passed an action
 */
export enum Action {
    EDIT = 0,
    DELETE = 1,
    VIEW = 2
}
/**
 * @description it is used for event emitter type
 * @prop id wiil return number type value
 * @prop action will return enum type value
 */
export class ActionEvent {
    id: number;
    action: Action;
}
