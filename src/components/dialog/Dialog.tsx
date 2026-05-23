import {
  CSSProperties,
  Children,
  FC,
  type ReactNode,
  type Ref,
  type RefObject,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
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

interface DialogContentInternalProps {
  __setDialogElement?: (element: HTMLDialogElement | null) => void;
  __alert?: boolean;
  __closeDisabled?: boolean;
  __closeHidden?: boolean;
  __dialogClassName?: string;
  __style?: CSSProperties;
}

interface DialogContentProps extends DialogContentInternalProps {
  children?: ReactNode;
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
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | null>(
    null,
  );
  const [position, setPosition] = useState<Vector | null>(null);
  const [currentPlacement, setCurrentPlacement] =
    useState<Placement>(defaultPlacement);

  const open = useCallback(
    (options?: OpenOptions) => {
      const el = dialogElement;
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
    [anchorRef, defaultPlacement, dialogElement, offset, onOpen],
  );

  const close = useCallback(() => {
    const el = dialogElement;
    if (!el) return;

    onClose?.();

    if (typeof el.hidePopover === 'function' && el.matches(':popover-open')) {
      el.hidePopover();
      return;
    }
    if (el.open) el.close();
  }, [dialogElement, onClose]);

  const controls = useMemo<DialogControls>(
    () => ({
      open,
      close,
      get element() {
        return dialogElement;
      },
    }),
    [close, dialogElement, open],
  );

  useImperativeHandle(controlsRef, () => controls, [controls]);

  const style = useMemo<CSSProperties | undefined>(
    () =>
      position === null
        ? undefined
        : {
            position: 'fixed',
            left: `${clamp(position.x, 16, window.innerWidth - 16)}px`,
            top: `${clamp(position.y, 16, window.innerHeight - 16)}px`,
            transform: transformByPlacement[currentPlacement],
            margin: 0,
          },
    [currentPlacement, position],
  );

  const renderedChildren = useMemo(() => {
    const result: ReactNode[] = [];

    for (const child of Children.toArray(children)) {
      if (!isValidElement<DialogContentProps>(child)) {
        result.push(child);
        continue;
      }

      if (child.type !== DialogContent) {
        result.push(child);
        continue;
      }

      result.push(
        cloneElement(child, {
          __setDialogElement: setDialogElement,
          __alert: alert,
          __closeDisabled: closeDisabled,
          __closeHidden: closeHidden,
          __dialogClassName: className,
          __style: style,
        }),
      );
    }

    return result;
  }, [
    alert,
    children,
    className,
    closeDisabled,
    closeHidden,
    setDialogElement,
    style,
  ]);

  return (
    <DialogContext.Provider value={controls}>
      {renderedChildren}
    </DialogContext.Provider>
  );
};

export const DialogContent: FC<DialogContentProps> = ({
  children,
  className,
  __setDialogElement,
  __alert,
  __closeDisabled,
  __closeHidden,
  __dialogClassName,
  __style,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const controls = useContext(DialogContext);

  useEffect(() => {
    __setDialogElement?.(dialogRef.current);

    return () => {
      __setDialogElement?.(null);
    };
  }, [__setDialogElement]);

  return (
    <dialog
      ref={dialogRef}
      popover={__alert ? 'manual' : 'auto'}
      className={classNames(styles.dialog, __dialogClassName, className)}
      style={__style}
    >
      {!__closeHidden && (
        <button
          disabled={__closeDisabled}
          className={styles.closeButton}
          onClick={() => controls?.close()}
          aria-label="Close"
        >
          ×
        </button>
      )}
      <div className={styles.content}>{children}</div>
    </dialog>
  );
};

interface DialogTriggerProps {
  children?: ReactNode;
  className?: string;
}

export const DialogTrigger: FC<DialogTriggerProps> = ({
  children,
  className,
}) => {
  const controls = useContext(DialogContext);
  return (
    <div
      onClick={() => controls?.open()}
      className={classNames(styles.trigger, className)}
    >
      {children}
    </div>
  );
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
