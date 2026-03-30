export type Placement =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type Vector = { x: number; y: number };

export type AnchorTarget = HTMLElement | DialogControls | null;

export interface OpenOptions {
  at?: Vector;
  anchorEl?: AnchorTarget;
  placement?: Placement;
  offset?: Vector;
}

export interface DialogControls {
  open: (options?: OpenOptions) => void;
  close: () => void;
  readonly element: HTMLDialogElement | null;
}
