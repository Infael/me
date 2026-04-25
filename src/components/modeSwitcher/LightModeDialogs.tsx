import { FC, RefObject, useMemo, useRef, useState } from 'react';

import { DialogProps, getPrompts } from './LightModeDialogsGameConfig';
import {
  Dialog,
  DialogContent,
  DialogControls,
  DialogFooter,
} from '@components/dialog';

import styles from './LightModeDialogs.module.css';

const SEED = Math.random();

interface LightModeDialogsProps {
  firstDialogRef: RefObject<DialogControls | null>;
  onSuccess: () => void;
}

interface DialogItem extends DialogProps {
  key: string;
  answerItems: Array<{ key: string; value: React.ReactNode }>;
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

  const dialogs = useMemo<DialogItem[]>(() => {
    const base = getPrompts(SEED);

    return base.map((dialog, dialogIndex) => {
      const combined = [...dialog.correctAnswer, ...dialog.incorrectAnswer];
      const answers = dialog.shuffleAnswers
        ? shuffle(combined)
        : dialog.incorrectAnswer.concat(dialog.correctAnswer);

      return {
        ...dialog,
        answers,
        key: `dialog-${dialogIndex}-${crypto.randomUUID()}`,
        answerItems: answers.map((value, answerIndex) => ({
          key: `answer-${dialogIndex}-${answerIndex}-${crypto.randomUUID()}`,
          value,
        })),
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
            key={dialog.key}
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
            <DialogContent>
              {dialog.prompt}
              <DialogFooter className={styles.lightModeDialogFooter}>
                {dialog.answerItems.map((answerItem) => (
                  <button
                    key={answerItem.key}
                    disabled={!isActive}
                    onClick={async () => {
                      const isCorrect = dialog.correctAnswer.includes(
                        answerItem.value,
                      );

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
                    {answerItem.value}
                  </button>
                ))}
              </DialogFooter>
            </DialogContent>
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
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  );
};
