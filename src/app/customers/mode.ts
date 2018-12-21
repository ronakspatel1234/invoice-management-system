export enum Mode {
  ADD = 0,
  Edit = 1
}
export class ModeEvent {
  id: number;
  mode: Mode;
}
