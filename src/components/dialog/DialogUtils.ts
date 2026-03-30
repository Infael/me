import { AnchorTarget, Placement, Vector } from './DialogTypes';

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const getAnchorElement = (anchor?: AnchorTarget): HTMLElement | null => {
  if (!anchor) return null;
  if ('element' in anchor) return anchor.element;
  return anchor;
};

export const resolveFromAnchor = (
  anchor: HTMLElement,
  placement: Placement,
  offset: Vector,
): Vector => {
  const rect = anchor.getBoundingClientRect();

  switch (placement) {
    case 'top':
      return {
        x: rect.left + rect.width / 2 + offset.x,
        y: rect.top - offset.y,
      };
    case 'bottom':
      return {
        x: rect.left + rect.width / 2 + offset.x,
        y: rect.bottom + offset.y,
      };
    case 'left':
      return {
        x: rect.left - offset.x,
        y: rect.top + rect.height / 2 + offset.y,
      };
    case 'right':
      return {
        x: rect.right + offset.x,
        y: rect.top + rect.height / 2 + offset.y,
      };
    case 'top-left':
      return { x: rect.left - offset.x, y: rect.top - offset.y };
    case 'top-right':
      return { x: rect.right + offset.x, y: rect.top - offset.y };
    case 'bottom-left':
      return { x: rect.left - offset.x, y: rect.bottom + offset.y };
    case 'bottom-right':
      return { x: rect.right + offset.x, y: rect.bottom + offset.y };
    default:
      return {
        x: rect.left + rect.width / 2 + offset.x,
        y: rect.top + rect.height / 2 + offset.y,
      };
  }
};

export const transformByPlacement: Record<Placement, string> = {
  center: 'translate(-50%, -50%)',
  top: 'translate(-50%, -100%)',
  bottom: 'translate(-50%, 0)',
  left: 'translate(-100%, -50%)',
  right: 'translate(0, -50%)',
  'top-left': 'translate(-100%, -100%)',
  'top-right': 'translate(0, -100%)',
  'bottom-left': 'translate(-100%, 0)',
  'bottom-right': 'translate(0, 0)',
};
