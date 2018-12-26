export enum Mode {
  ADD = 'add',
  Edit = 'edit'
}
export class ModeEvent {
  id: number;
  mode: Mode;
}
