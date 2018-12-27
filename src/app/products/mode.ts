export enum Action
{
    EDIT=0,
    ADD=1
}
export class ActionEvent {
    id: number;
    action: Action;
}

