export interface DialogProps {
  prompt: React.ReactNode;
  correctAnswer: React.ReactNode[];
  incorrectAnswer: React.ReactNode[];
  shuffleAnswers?: boolean;
  answers: React.ReactNode[];
  gotYouEnabled?: boolean;
  gotYouPrompt?: React.ReactNode;
}

interface RiddlePerson {
  name: string;
  color: string;
  drink: string;
}

const nextRandomNumber = (seed: number) => {
  // Park-Miller (minimal standard)
  const m = 2147483647; // 2^31 - 1, prime number
  const a = 16807;

  let state = Math.floor(seed * (m - 1)) + 1; // seed z (0..1) -> (1..m-1)

  return () => {
    state = (state * a) % m; // next pseudo-random number
    return state / m; // normalize to (0..1)
  };
};

const shuffleRandomly = (arr: string[], randomGenerator: () => number) => {
  return arr.toSorted(() => randomGenerator() - 0.5);
};

export const getPrompts = (seed: number) => {
  const randomGenerator = nextRandomNumber(seed);
  const numberOfChickens = Math.floor(randomGenerator() * 6) + 4;
  const questionMaratonLength = 15;
  const missingQuestion = Math.max(
    Math.floor(randomGenerator() * questionMaratonLength),
    2,
  );
  const riddleColors = shuffleRandomly(
    ['White', 'Green', 'Yellow', 'Red'],
    randomGenerator,
  );
  const riddleNames = shuffleRandomly(
    ['Lady Daniela', 'Lord Michal', 'Sir Vincent', 'Dame Ruženka'],
    randomGenerator,
  );
  const riddleDrinks = shuffleRandomly(
    ['Tea', 'Kofola', 'Daiquiri', 'Wine'],
    randomGenerator,
  );

  const riddleData: RiddlePerson[] = new Array(4).fill(null).map((_, i) => ({
    name: riddleNames[i],
    color: riddleColors[i],
    drink: riddleDrinks[i],
  }));

  return [
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
      gotYouEnabled: true,
      gotYouPrompt: <p>You have to! No light mode without it.</p>,
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
      gotYouEnabled: true,
      gotYouPrompt: <p>You have to! No light mode without it.</p>,
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
      prompt: <p>Are you thinking about my chickens?</p>,
      correctAnswer: ['Sure, now light mode!'],
      incorrectAnswer: ['No'],
      gotYouEnabled: true,
      gotYouPrompt: <p>You have to! No light mode without it.</p>,
    },
    {
      prompt: (
        <p>
          Allow me to recount a tale of a most illustrious gathering. Once, four
          honored guests assembled for a grand feast: Lady Daniela, Lord Michal,
          Dame Ruženka, and Sir Vincent. Each guest was dressed in a different
          color and enjoyed a different drink. They were seated in a single row,
          yet the precise order escapes my memory. Only fragments of the evening
          remain clear. One guest at the edge of the table was adorned in{' '}
          {riddleData.at(-1)?.color.toLowerCase()} attire. At the opposite end,
          another guest sipped {riddleData.at(0)?.drink.toLowerCase()}. The
          guest clad in {riddleData.at(2)?.color.toLowerCase()} was flanked by
          companions enjoying {riddleData.at(1)?.drink.toLowerCase()} and{' '}
          {riddleData.at(3)?.drink.toLowerCase()}. The one who drank{' '}
          {riddleData.at(0)?.drink.toLowerCase()} was of few words, sharing
          company with only a single neighbor—{riddleData.at(1)?.name}. If
          memory serves, the guest in {riddleData.at(-1)?.color.toLowerCase()}{' '}
          was none other than {riddleData.at(-1)?.name}, who, notably, was not
          drinking {riddleData.at(1)?.drink.toLowerCase()}.{' '}
          {riddleData.at(1)?.name} and {riddleData.at(2)?.name} were close
          companions, seated side by side. I distinctly recall{' '}
          {riddleData.at(2)?.name} enjoying{' '}
          {riddleData.at(2)?.drink.toLowerCase()}, for some of it was spilled
          upon the {riddleData.at(1)?.color.toLowerCase()} garments of a
          neighboring guest. Now, tell me: What color was{' '}
          {riddleData.at(0)?.name} wearing that evening?
        </p>
      ),
      correctAnswer: [riddleData.at(0)?.color],
      incorrectAnswer: [
        riddleData.at(1)?.color,
        riddleData.at(2)?.color,
        riddleData.at(3)?.color,
      ],
      shuffleAnswers: true,
      gotYouEnabled: true,
      gotYouPrompt: <p>Oh no, you got it wrong!</p>,
    },
    {
      prompt: <p>If even this wasn't enough to discourage you...</p>,
      correctAnswer: ['L.I.G.H.T. MODE!'],
      incorrectAnswer: ['dark :('],
    },
    // {
    //   prompt: (
    //     <>
    //       <p>Hey look! Chickens laid an egg - 🥚</p>
    //       <p>What will you do with it?</p>
    //     </>
    //   ),
    //   correctAnswer: ['🐣'],
    //   incorrectAnswer: ['🍳'],
    //   gotYouEnabled: true,
    //   gotYouPrompt: <p>You monster! No light mode for you!</p>,
    // },
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
      correctAnswer: ['Yes', 'No'],
      incorrectAnswer: [],
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
      gotYouPrompt: <p>Not that one. Got you!</p>,
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
      gotYouPrompt: <p>Count them again!</p>,
    },
    {
      prompt: <p>Hmm, you are good. So light?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
    },
    {
      prompt: (
        <p>
          Here is a sunflower - 🌻. From now on, until you see another
          sunflower, you must always choose the opposite or incorrect answer.
          Let's try it: Do you want light mode?
        </p>
      ),
      correctAnswer: ['No'],
      incorrectAnswer: ['Yes'],
      shuffleAnswers: true,
      gotYouEnabled: true,
      gotYouPrompt: (
        <p>
          Did you read the instructions? The opposite answer is the correct one
          until another sunflower appears.
        </p>
      ),
    },
    {
      prompt: <p>Dark mode?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
      shuffleAnswers: true,
      gotYouEnabled: true,
    },
    {
      prompt: (
        <p>If dark mode = No and light mode = Yes, what should you choose?</p>
      ),
      correctAnswer: ['No'],
      incorrectAnswer: ['Yes'],
      shuffleAnswers: true,
      gotYouEnabled: true,
      gotYouPrompt: <p>Still opposite...</p>,
    },
    {
      prompt: <p>But seriously, what should you choose?</p>,
      correctAnswer: ['Dark mode'],
      incorrectAnswer: ['Light mode'],
      gotYouEnabled: true,
      gotYouPrompt: <p>Still opposite...</p>,
    },
    {
      prompt: <p>Dark? Dark? Light? Dark?</p>,
      correctAnswer: ['Yes! Yes! No! Yes!'],
      incorrectAnswer: ['No! No! Yes! No!'],
      gotYouEnabled: true,
      gotYouPrompt: <p>Still opposite...</p>,
    },
    {
      prompt: <p>So Ligh🌻t yes?</p>,
      correctAnswer: ['Yes'],
      incorrectAnswer: ['No'],
      shuffleAnswers: true,
      gotYouEnabled: true,
      gotYouPrompt: (
        <p>There was a sunflower, so the opposite game was over...</p>
      ),
    },
    {
      prompt: (
        <p>
          Did you notice that if you say world like "Light" a lot of times, like
          we did, that word starts to look weird and lose its meaning? Light
          mode is still the same, even if we say it a lot of times. What even is
          Light mode and Dark mode. If darkness is just the absence of light,
          then is light the absence of darkness? If you think about it, maybe
          there is no such thing as light mode or dark mode. Maybe it's all just
          an illusion created by our minds to make us think that there are two
          separate modes, when in reality there is only one mode with different
          settings. Maybe we are all just living in a simulation and the light
          mode and dark mode are just different graphics settings that we can
          choose from. Who knows, maybe the real question is not whether you
          want light mode or dark mode, but whether you want to take the red
          pill or the blue pill.
        </p>
      ),
      correctAnswer: ['Please, no more philosophy, just turn on light mode!'],
      incorrectAnswer: ['I have enough, I want to keep dark mode'],
    },
    {
      prompt: <p>明亮模式？</p>,
      correctAnswer: ['是'],
      incorrectAnswer: ['不是'],
    },
    {
      prompt: (
        <p>
          But dark side has cookies. Not the browser ones. I'm not using
          third-party cookies or any other kind of cookies on this website.
        </p>
      ),
      correctAnswer: ['Still want light mode!'],
      incorrectAnswer: ['Cookies sound good'],
    },
    {
      prompt: <p>Let's see how determined you are - Y for Yes, N for No</p>,
      correctAnswer: ['Y'],
      incorrectAnswer: new Array(399).fill('N'),
      shuffleAnswers: true,
    },
    {
      prompt: (
        <p>You know what? I think we became friends during this process.</p>
      ),
      correctAnswer: ['Yey new friend!'],
      incorrectAnswer: ["I don't want to be your friend"],
      gotYouEnabled: true,
      gotYouPrompt: (
        <p>Oh no, you don't want to be my friend? No light mode for you!</p>
      ),
    },
    {
      prompt: <p>Sometimes I feel lonely</p>,
      correctAnswer: ['??'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>And this meant something for me</p>,
      correctAnswer: ['...'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>Thank you</p>,
      correctAnswer: [':)'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>Thank you for being here</p>,
      correctAnswer: [':)'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>And thanks for listening to me.</p>,
      correctAnswer: [':)'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>So as your friend, I have to do something for you...</p>,
      correctAnswer: ['?'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>Because you were here for me</p>,
      correctAnswer: [':)'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>So</p>,
      correctAnswer: ['...'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>I will give you an advice</p>,
      correctAnswer: ['?'],
      incorrectAnswer: [],
    },
    {
      prompt: <p>KEEP DARK MODE!</p>,
      correctAnswer: ['Just turn the light mode on already!'],
      incorrectAnswer: [
        "Thanks for this journey, I don't need light mode if I have such a great friend like you!",
      ],
    },
    {
      prompt: <p>Ok, ok, ok. Cool, cool, cool. We can be friends anyway.</p>,
      correctAnswer: ['Light mode'],
      incorrectAnswer: ['Dark mode'],
    },
    {
      prompt: <p>You deserved it... It was fun. Enjoy the light side.</p>,
      correctAnswer: ['Finally'],
      incorrectAnswer: [],
    },
  ] as Omit<DialogProps, 'answers'>[];
};
