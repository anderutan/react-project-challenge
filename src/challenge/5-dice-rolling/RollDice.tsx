import { useState } from 'react';
import Die from './Die';

const randomNum = () => {
  return Math.floor(Math.random() * 6 + 1);
};

const RollDice = () => {
  const [die1, setDie1] = useState(1);
  const [die2, setDie2] = useState(1);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    setDie1(randomNum);
    setDie2(randomNum);
    setTimeout(deactivateAfterDelay, 1000);
  };

  const deactivateAfterDelay = () => {
    setActive(false);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-10 mb-16'>
        <Die num={die1} active={active} />
        <Die num={die2} active={active} />
      </div>
      <button
        onClick={handleClick}
        className={`px-16 py-5 bg-black text-white rounded-lg ${
          active && 'bg-purple-400'
        }`}
      >
        {active ? 'Rolling!' : 'Roll Dice!'}
      </button>
    </div>
  );
};

export default RollDice;
