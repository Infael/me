import { FC, ReactNode } from 'react';

import styles from './SectionParagraph.module.css';

interface SectionParagraphProps {
  children: ReactNode;
}

export const SectionParagraph: FC<SectionParagraphProps> = ({ children }) => {
  return <p className={styles.mainText}>{children}</p>;
};
