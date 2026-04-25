import { FC, KeyboardEvent, useState } from 'react';

import { StarIcon } from './StarIcon';
import { Dialog, DialogContent, DialogTrigger } from '@components/dialog';
import { classNames } from '@utils';

import styles from './SkillTab.module.css';

interface SkillTabProps {
  title: string;
  level: number;
  description?: string;
}

export const SkillTab: FC<SkillTabProps> = ({ title, level, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filledStars = Array.from(
    { length: level },
    (_, starNumber) => starNumber + 1,
  );
  const emptyStars = Array.from(
    { length: 4 - level },
    (_, starNumber) => starNumber + 1,
  );

  const toggleExpanded = () => {
    setIsExpanded((current) => !current);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div
      className={classNames(styles.skilltab, isExpanded && styles.skilltabOpen)}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      {title}
      <span className={styles.skillLevel}>
        {filledStars.map((starNumber) => (
          <StarIcon key={`filled-${starNumber}`} size={24} />
        ))}
        {emptyStars.map((starNumber) => (
          <StarIcon key={`empty-${starNumber}`} size={24} empty />
        ))}

        {description && (
          <div onClick={(e) => e.stopPropagation()}>
            <Dialog className={styles.skilltabDialog}>
              <DialogContent className={styles.dialogContent}>
                <h3>{title}</h3>
                {description && <p>{description}</p>}
              </DialogContent>
              <DialogTrigger>
                <button className={styles.descriptionButton}>?</button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </span>
    </div>
  );
};
