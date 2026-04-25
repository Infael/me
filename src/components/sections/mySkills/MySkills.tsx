import { FC } from 'react';

import { SkillTab } from './components/skillTab/SkillTab';
import { StarIcon } from './components/skillTab/StarIcon';
import { Header } from '@components';
import { Dialog, DialogContent, DialogTrigger } from '@components/dialog';

import styles from './MySkills.module.css';

export const MySkills: FC = () => {
  return (
    <>
      <Header>Everything I used</Header>
      <div className={styles.skills}>
        <SkillTab title="TypeScript" level={4} />
        <SkillTab title="JavaScript" level={4} />
        <SkillTab title="Node.js" level={4} />
        <SkillTab title="React" level={4} />
        <SkillTab title="NextJS" level={4} />
        <SkillTab title="CSS" level={4} />
        <SkillTab title="HTML" level={4} />
        <SkillTab title="Vue" level={3} />
        <SkillTab title="Redux" level={3} />
        <SkillTab title="Zustand" level={3} />
        <SkillTab title="Tanstack" level={3} />
        <SkillTab title="Storybook" level={3} />
        <SkillTab
          title="Hypnos"
          level={3}
          description="Not a technology, Hypnos is the Greek god of sleep."
        />
        <SkillTab title="Vitest" level={4} />
        <SkillTab title="Jest" level={3} />
        <SkillTab title="Cypress" level={3} />
        <SkillTab title="Playwright" level={3} />
        <SkillTab title="C#" level={3} />
        <SkillTab title=".NET" level={3} />
        <SkillTab title="Python" level={3} />
        <SkillTab title="Django" level={2} />
        <SkillTab title="NumPy" level={3} />
        <SkillTab title="Pandas" level={2} />
        <SkillTab title="Matplotlib" level={2} />
        <SkillTab title="Scikit-learn" level={2} />
        <SkillTab title="Dart" level={3} />
        <SkillTab title="Flutter" level={3} />
        <SkillTab
          title="Echo"
          level={3}
          description="Not a technology, In Greek mythology Echo was an Oread (mountain nymph) cursed by Hera to only repeat the last words spoken by others. Cool story, check it out!"
        />
        <SkillTab title="SQL" level={3} />
        <SkillTab title="Git" level={4} />
        <SkillTab title="Docker" level={3} />
        <SkillTab title="MonoGame" level={2} />
        <SkillTab title="Kotlin" level={2} />
        <SkillTab title="Spring Boot" level={2} />
        <SkillTab title="Bash" level={3} />
        <SkillTab title="Prolog" level={2} />
        <SkillTab title="C++" level={2} />
        <SkillTab
          title="Eris"
          level={1}
          description="Not a technology, Eris is the Greek goddess of strife, discord, and chaos."
        />
        <SkillTab title="Unity" level={1} />
        <SkillTab title="Go" level={1} />
        <SkillTab title="Lambda Calculus" level={1} />
        <SkillTab title="Blender" level={2} />
        <SkillTab title="Figma" level={3} />
        <SkillTab title="Tauri" level={1} />
        <SkillTab title="REST" level={3} />
        <SkillTab title="GraphQL" level={2} />
        <SkillTab title="WebSockets" level={2} />
        <SkillTab
          title="Alecto"
          level={2}
          description="Not a technology, Alecto is one of the Furies in Greek mythology, known for punishing crimes of anger and rage."
        />
        <SkillTab title="Agile" level={3} />
        <SkillTab title="Scrum" level={3} />
        <SkillTab title="Kanban" level={3} />
        <SkillTab title="Waterfall" level={3} />
        <SkillTab title="CI/CD" level={3} />
        <SkillTab title="Github Workflows" level={3} />
        <SkillTab title="Azure" level={3} />
        <SkillTab title="Supabase" level={3} />
        <SkillTab title="Firebase" level={2} />
        <SkillTab title="Scala" level={1} />
        <SkillTab title="FreeCAD" level={1} />
        <SkillTab title="ElasticSearch" level={3} />
        <SkillTab title="Argo" level={3} />
        <SkillTab
          title="Nyx"
          level={4}
          description="Not a technology, Nyx is the Greek goddess of the night."
        />
        <SkillTab title="OpenShift" level={3} />
        <SkillTab title="Google Analytics" level={3} />
        <SkillTab title="Posthog" level={3} />
      </div>
      <Dialog>
        <DialogContent>
          <p>
            Basically everything I remember using during my career or my studies
            (I'm sure I'm forgetting a lot). And some characters from Greek
            mythology to spice things up. Can you find them all?
          </p>
          <p>
            Best and simplest evaluation of my skills that I can think of - not
            exact for all the technologies, but gives a general idea:
          </p>
          <div className={styles.legendSkillRow}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <p> - Expert</p>
          </div>
          <div className={styles.legendSkillRow}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon empty />
            <p> - Used Professionally</p>
          </div>
          <div className={styles.legendSkillRow}>
            <StarIcon />
            <StarIcon />
            <StarIcon empty />
            <StarIcon empty />
            <p> - Used on Personal Projects</p>
          </div>
          <div className={styles.legendSkillRow}>
            <StarIcon />
            <StarIcon empty />
            <StarIcon empty />
            <StarIcon empty />
            <p> - Studied and used slightly</p>
          </div>
        </DialogContent>
        <DialogTrigger className={styles.legendDialogTrigger}>
          <button>Legend</button>
        </DialogTrigger>
      </Dialog>
    </>
  );
};
