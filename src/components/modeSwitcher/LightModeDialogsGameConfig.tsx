export interface DialogProps {
  prompt: React.ReactNode;
  correctAnswer: React.ReactNode[];
  incorrectAnswer: React.ReactNode[];
  shuffleAnswers?: boolean;
  answers: React.ReactNode[];
  gotYouEnabled?: boolean;
  gotYouPrompt?: React.ReactNode;
}

export const getPrompts = (
  numberOfChickens: number,
  questionMaratonLength: number,
  missingQuestion: number,
) =>
  [
    {
      prompt: <p>Are you sure?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>Noooo 😅 really?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>But... Nooooo 😅</p>,
      correctAnswer: ['Still yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>Do you seriously want to continue?</p>
          <p>There will be a lot of questions...</p>
          <p>And I mean A LOT!</p>
        </>
      ),
      correctAnswer: ['Yes, I am ready!'],
      incorrectAnswer: ['No, I want to keep dark mode'],
    },
    {
      prompt: <p>You are funny, but noooo-oo 😅</p>,
      correctAnswer: ['Ye-es!'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>Ok but you have to take care of my chickens.</p>,
      correctAnswer: ['Ok'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>Here are my chickens:</p>
          <p style={{ textAlign: 'center' }}>{'🐔'.repeat(numberOfChickens)}</p>
        </>
      ),
      correctAnswer: ['Wow!'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>Light mode is sooo bright, isn't it?</p>
          <p>You want it anyway?"</p>
        </>
      ),
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>But it's said that light attracts bugs...</p>
          <p>Do you want to risk it?</p>
        </>
      ),
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>And it's not good for your eyes...</p>
          <p>Continue?</p>
        </>
      ),
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>And not good for... ehm... Environment!</p>
          <p>Do you want it anyway?</p>
        </>
      ),
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>Should we stop and keep the dark mode?</p>,
      correctAnswer: ['No'],
      incorrectAnswer: ['Yes'],
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: <p>I think I almost got you!</p>,
      correctAnswer: ['Not really, now turn on light mode!'],
      incorrectAnswer: ['That was funny, I will keep dark mode'],
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: <p>Are you thinking about chickens?</p>,
      correctAnswer: ['Sure'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <>
          <p>Hey look! Chickens laid an egg - 🥚</p>
          <p>What will you do with it?</p>
        </>
      ),
      correctAnswer: ['🐣'],
      incorrectAnswer: ['🍳'],
      gotYouEnabled: true,
      gotYouPrompt: <p>You monster! No light mode for you!</p>,
    },
    {
      prompt: <p>I'm enjoying this! Let's make a special round of questions</p>,
      correctAnswer: ["Let's go!"],
      incorrectAnswer: ['No, I want to keep dark mode'],
    },
    ...new Array(questionMaratonLength)
      .fill(null)
      .map((_, i) => ({
        id: i,
        prompt: (
          <p>{`Still want light mode? ${i + 1} / ${questionMaratonLength}`}</p>
        ),
        correctAnswer: ['Yes'],
        incorrectAnswer: ['No'],
      }))
      .filter((_, i) => i !== missingQuestion),
    {
      prompt: <p>Still here?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>Did you noticed that one question was missing?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No, I give up (like a noob)'],
      gotYouEnabled: true,
    },
    {
      prompt: <p>Which one was missing?</p>,
      correctAnswer: [`Question ${missingQuestion + 1}`],
      incorrectAnswer: Array.from({ length: questionMaratonLength }, (_, i) =>
        i === missingQuestion ? null : `Question ${i + 1}`,
      ).filter(Boolean),
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: <p>Impressive! You are a true light mode believer!</p>,
      correctAnswer: ['Yes, I am!'],
      incorrectAnswer: ['Not anymore...'],
    },
    {
      prompt: (
        <p>
          Watch out! There's a fox there! Catch it so it doesn't get the
          chickens!
        </p>
      ),
      correctAnswer: ['🦊'],
      incorrectAnswer: ['🌱', '🌿', '🌳', '🌱'],
      shuffleAnswers: true,
      gotYouEnabled: true,
      gotYouPrompt: (
        <p>
          Nooo my chickens, the fox got them. Now I'm sad, I can't let you turn
          the light mode on.
        </p>
      ),
    },
    {
      prompt: <p>Not-not-light mode?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: <p>So light mode?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
      shuffleAnswers: true,
    },
    {
      prompt: <p>If you say please...</p>,
      correctAnswer: ['Please'],
      incorrectAnswer: ['No'],
      shuffleAnswers: true,
    },
    {
      prompt: <p>How many chickens do I have?</p>,
      correctAnswer: [`${numberOfChickens}`],
      incorrectAnswer: ['4', '5', '6', '7', '8', '9', '10'].filter(
        (n) => n !== `${numberOfChickens}`,
      ),
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: <p>Hmm, you are good. So light?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: <p>Let's see how determined you are - Y for Yes, N for No</p>,
      correctAnswer: ['Y'],
      incorrectAnswer: new Array(399).fill('N'),
      shuffleAnswers: true,
    },
    {
      prompt: <p>Fine... enjoy</p>,
      correctAnswer: ['Finally'],
      incorrectAnswer: [],
    },
  ] as Omit<DialogProps, 'answers'>[];
