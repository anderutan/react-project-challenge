import { useEffect, useState } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';

const gameOptions = ['rock', 'paper', 'scissors'];

const getRandomChoice = () =>
  gameOptions[Math.floor(Math.random() * gameOptions.length)];

const RockPaperScissor = () => {
  const [choice, setChoice] = useState({ user: '', computer: '' });
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const calculateResult = (userChoice: string, computerChoice: string) => {
    if (userChoice === computerChoice) return;
    if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const handleClick = (choice: string) => {
    setChoice({ user: choice, computer: getRandomChoice() });
  };

  useEffect(() => {
    if (choice.user && choice.computer) {
      calculateResult(choice.user, choice.computer);
    }
  }, [choice]);

  return (
    <div className='w-full h-screen bg-slate-700 text-white flex flex-col justify-center items-center'>
      <h1 className='font-semibold text-green-600 text-3xl mb-5'>
        WELCOME TO ROCK, PAPER, SCISSORS GAME
      </h1>
      <div className='flex gap-5'>
        <button
          onClick={() => handleClick('rock')}
          className='px-6 py-3 bg-green-800 rounded-lg font-semibold flex gap-2 items-center hover:bg-green-700'
        >
          <FaHandRock /> Rock
        </button>
        <button
          onClick={() => handleClick('paper')}
          className='px-6 py-2 bg-green-800 rounded-lg font-semibold  flex gap-2 items-center hover:bg-green-700'
        >
          <FaHandPaper /> Paper
        </button>
        <button
          onClick={() => handleClick('scissors')}
          className='px-6 py-2 bg-green-800 rounded-lg font-semibold flex gap-2 items-center hover:bg-green-700'
        >
          <FaHandScissors /> Scissors
        </button>
      </div>
      <div className='py-5 text-center flex flex-col gap-3'>
        <p className='text-lg text-semibold'>
          Your Choice:{' '}
          <span className='uppercase font-bold text-2xl pl-3'>
            {choice.user}
          </span>
        </p>
        <p className='text-lg text-semibold'>
          Computer's Choice:{' '}
          <span className='uppercase font-bold text-2xl pl-3'>
            {choice.computer}
          </span>
        </p>
        <p className='text-3xl text-semibold'>Your Score: {score.user}</p>
        <p className='text-3xl text-semibold'>
          Computer Score: {score.computer}
        </p>
      </div>
    </div>
  );
};

export default RockPaperScissor;
