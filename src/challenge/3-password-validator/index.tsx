import { useState } from 'react';
import ReactPasswordChecklist from 'react-password-checklist';

const PasswordValidator = () => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isStrong, setIsStrong] = useState<boolean>(false);

  const validate = (value: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(.{5,})$/;
    if (passwordRegex.test(value)) {
      setErrorMessage('Your password is STRONG!');
      setIsStrong(true);
    } else {
      setErrorMessage('Your password is WEAK!');
      setIsStrong(false);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    validate(e.target.value);
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <h1 className='text-3xl md:text-4xl font-bold text-center'>
        Checking Password Strength in ReactJS
      </h1>
      <label
        htmlFor='password'
        className='flex flex-col md:flex-row items-center justify-center gap-2 text-lg md:text-xl'
      >
        <p>Enter Your Password:</p>
        <input
          type='text'
          id='password'
          onChange={(e) => handleChange(e)}
          className={`border-2 border-black px-3 py-1 ${
            isStrong ? 'text-green-600 font-bold ' : 'text-red-600'
          }`}
        />
      </label>
      <ReactPasswordChecklist
        rules={['minLength', 'specialChar', 'number', 'capital']}
        minLength={5}
        value={password}
        className='text-lg'
      />
      <p
        className={`font-bold text-2xl px-5 py-3 ${
          isStrong ? 'bg-green-700 text-white' : 'bg-red-600 text-white'
        }`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default PasswordValidator;
