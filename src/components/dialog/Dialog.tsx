import {
  FC,
  type ReactNode,
  type Ref,
  type RefObject,
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { DialogControls, OpenOptions, Placement, Vector } from './DialogTypes';
import {
  clamp,
  getAnchorElement,
  resolveFromAnchor,
  transformByPlacement,
} from './DialogUtils';
import { classNames } from '@utils';

import styles from './Dialog.module.css';

const DialogContext = createContext<DialogControls | null>(null);

interface DialogProps {
  children?: ReactNode;
  alert?: boolean;
  controlsRef?: Ref<DialogControls | null>;
  onOpen?: () => void;
  onClose?: () => void;
  closeDisabled?: boolean;
  closeHidden?: boolean;
  defaultPlacement?: Placement;
  offset?: Vector;
  anchorRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export const Dialog: FC<DialogProps> = ({
  children,
  alert = false,
  controlsRef,
  onOpen,
  onClose,
  closeDisabled = false,
  closeHidden = false,
  defaultPlacement = 'center',
  offset = { x: 8, y: 8 },
  anchorRef,
  className,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [position, setPosition] = useState<Vector | null>(null);
  const [currentPlacement, setCurrentPlacement] =
    useState<Placement>(defaultPlacement);

  const open = useCallback(
    (options?: OpenOptions) => {
      const el = dialogRef.current;
      if (!el) return;

      const placement = options?.placement ?? defaultPlacement;
      const usedOffset = options?.offset ?? offset;

      setCurrentPlacement(placement);

      if (options?.at) {
        setPosition(options.at);
      } else {
        const anchor =
          getAnchorElement(options?.anchorEl) ?? anchorRef?.current ?? null;

        if (anchor) {
          setPosition(resolveFromAnchor(anchor, placement, usedOffset));
        } else {
          setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        }
      }

      onOpen?.();

      if (typeof el.showPopover === 'function') {
        if (!el.matches(':popover-open')) el.showPopover();
        return;
      }

      if (!el.open) el.showModal();
    },
    [anchorRef, defaultPlacement, offset, onOpen],
  );

  const close = useCallback(() => {
    const el = dialogRef.current;
    if (!el) return;

    onClose?.();

    if (typeof el.hidePopover === 'function' && el.matches(':popover-open')) {
      el.hidePopover();
      return;
    }
    if (el.open) el.close();
  }, [onClose]);

  const controls = useMemo<DialogControls>(
    () => ({
      open,
      close,
      get element() {
        return dialogRef.current;
      },
    }),
    [open, close],
  );

  useImperativeHandle(controlsRef, () => controls, [controls]);

  const style =
    position === null
      ? undefined
      : {
          position: 'fixed' as const,
          left: `${clamp(position.x, 16, window.innerWidth - 16)}px`,
          top: `${clamp(position.y, 16, window.innerHeight - 16)}px`,
          transform: transformByPlacement[currentPlacement],
          margin: 0,
        };

  return (
    <DialogContext value={controls}>
      <dialog
        ref={dialogRef}
        popover={alert ? 'manual' : 'auto'}
        className={classNames(styles.dialog, className)}
        style={style}
      >
        {!closeHidden && (
          <button
            disabled={closeDisabled}
            className={styles.closeButton}
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        )}
        <div className={styles.content}>{children}</div>
      </dialog>
    </DialogContext>
  );
};

interface DialogTriggerProps {
  children?: ReactNode;
}

export const DialogTrigger: FC<DialogTriggerProps> = ({ children }) => {
  const controls = useContext(DialogContext);
  return <div onClick={() => controls?.open()}>{children}</div>;
};

interface DialogFooterProps {
  children?: ReactNode;
  className?: string;
}

export const DialogFooter: FC<DialogFooterProps> = ({
  children,
  className,
}) => {
  return <div className={classNames(styles.footer, className)}>{children}</div>;
};
