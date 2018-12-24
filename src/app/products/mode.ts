export enum Mode
{
    EDIT=0,
    ADD=1
}
export class ModeEvent {
    id: number;
    action: Mode;
}

