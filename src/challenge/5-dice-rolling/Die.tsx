import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';

type Props = {
  num: number;
  active: boolean;
};

const diceSet = [
  { diceNum: 1, icon: FaDiceOne },
  { diceNum: 2, icon: FaDiceTwo },
  { diceNum: 3, icon: FaDiceThree },
  { diceNum: 4, icon: FaDiceFour },
  { diceNum: 5, icon: FaDiceFive },
  { diceNum: 6, icon: FaDiceSix },
];

const Die = ({ num, active }: Props) => {
  const dice = diceSet.filter((dice) => dice.diceNum === num)[0];

  return (
    <div className={`${active && 'animate-waving'}`}>
      <dice.icon className='h-40 w-40 text-indigo-500' />
    </div>
  );
};

export default Die;
