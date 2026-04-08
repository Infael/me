import { FC, RefObject, useMemo, useRef, useState } from 'react';

import { DialogProps, getPrompts } from './LightModeDialogsGameConfig';
import { Dialog, DialogControls, DialogFooter } from '@components/dialog';

import styles from './LightModeDialogs.module.css';

const SEED = Math.random();

interface LightModeDialogsProps {
  firstDialogRef: RefObject<DialogControls | null>;
  onSuccess: () => void;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const LightModeDialogs: FC<LightModeDialogsProps> = ({
  firstDialogRef,
  onSuccess,
}) => {
  const otherDialogRefs = useRef<Array<DialogControls | null>>([]);
  const gotYouDialogRef = useRef<DialogControls | null>(null);
  const [activeDialog, setActiveDialog] = useState<number | 'gotYou'>(0);
  const [gotYouPrompt, setGotYouPrompt] = useState<React.ReactNode>(
    <p>Got you!</p>,
  );

  const dialogs = useMemo<DialogProps[]>(() => {
    const base = getPrompts(SEED);

    return base.map((dialog) => {
      const combined = [...dialog.correctAnswer, ...dialog.incorrectAnswer];
      return {
        ...dialog,
        answers: dialog.shuffleAnswers
          ? shuffle(combined)
          : dialog.incorrectAnswer.concat(dialog.correctAnswer),
      };
    });
  }, []);

  const getDialogRef = (index: number) =>
    index === 0 ? firstDialogRef.current : otherDialogRefs.current[index];

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const isDialogOpen = (
    controls: DialogControls | null | undefined,
  ): boolean => {
    const el = controls?.element;
    if (!el) return false;

    // <dialog>
    if (el.open) return true;

    // popover
    try {
      return el.matches(':popover-open');
    } catch {
      return false;
    }
  };

  const closeAllDialogs = async () => {
    const openedRefs = [
      firstDialogRef.current,
      ...otherDialogRefs.current,
      gotYouDialogRef.current,
    ]
      .filter(isDialogOpen)
      .reverse() as DialogControls[];

    for (const dialog of openedRefs) {
      dialog.close();
      await delay(50);
    }

    setActiveDialog(0);
  };

  return (
    <>
      {dialogs.map((dialog, index) => {
        const isLast = index === dialogs.length - 1;
        const isActive = activeDialog === index;

        return (
          <Dialog
            key={index}
            alert
            closeDisabled={!isActive}
            onClose={() => {
              setActiveDialog(Math.max(index - 1, 0));
            }}
            controlsRef={
              index === 0
                ? firstDialogRef
                : (controls) => {
                    otherDialogRefs.current[index] = controls;
                  }
            }
          >
            {dialog.prompt}
            <DialogFooter className={styles.lightModeDialogFooter}>
              {dialog.answers.map((answer, i) => (
                <button
                  key={i}
                  disabled={!isActive}
                  onClick={async () => {
                    const isCorrect = dialog.correctAnswer.includes(answer);

                    if (isCorrect && !isLast) {
                      setActiveDialog(index + 1);
                      getDialogRef(index + 1)?.open();
                      return;
                    }

                    if (!isCorrect && dialog.gotYouEnabled) {
                      setActiveDialog('gotYou');
                      setGotYouPrompt(dialog.gotYouPrompt || <p>Got you!</p>);
                      gotYouDialogRef.current?.open({
                        anchorEl: getDialogRef(index)?.element,
                        placement: 'top',
                        offset: { x: 0, y: -16 },
                      });
                      return;
                    }

                    await closeAllDialogs();

                    if (isCorrect) {
                      onSuccess();
                    }
                  }}
                >
                  {answer}
                </button>
              ))}
            </DialogFooter>
          </Dialog>
        );
      })}

      <Dialog
        alert
        controlsRef={(controls) => {
          gotYouDialogRef.current = controls;
        }}
        closeHidden
      >
        {gotYouPrompt}
        <DialogFooter>
          <button
            disabled={activeDialog !== 'gotYou'}
            onClick={async () => {
              gotYouDialogRef.current?.close();
              await closeAllDialogs();
            }}
          >
            Damn...
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
