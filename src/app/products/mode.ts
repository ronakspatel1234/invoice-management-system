export enum Mode
{
    EDIT='edit',
    ADD='add'
}
export class ModeEvent {
    id: number;
    action: Mode;
}

