import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Input = {
  firstName: string;
  lastName: string;
  email: string;
  contact: number;
  gender: 'male' | 'female' | 'other';
  subject: 'english' | 'maths' | 'physics';
  resume: File;
  url: string;
  language: 'react' | 'vue';
  about: string;
};

function isValidPhoneNum(input) {
  const regex = /^\d{10,11}$/;
  return regex.test(input);
}

const SubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);
  const inputStyle = 'border border-slate-500 p-2';
  const titleStyle = 'mb-2 text-lg font-bold';

  return (
    <div className='px-10 py-5'>
      <h1 className='text-green-800 font-bold text-3xl text-center mb-10'>
        Form in React
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='firstName' className='flex flex-col'>
          <p className={titleStyle}>First Name*</p>
          <input
            {...register('firstName', {
              required: 'Please Enter Your First Name',
            })}
            placeholder='Enter First Name'
            className={inputStyle}
          />
          <ErrorMessage
            errors={errors}
            name='firstName'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <label htmlFor='lastName' className='flex flex-col mt-4'>
          <p className={titleStyle}>Last Name*</p>
          <input
            {...register('lastName', {
              required: 'Please Enter Your Last Name',
            })}
            placeholder='Enter Last Name'
            className={inputStyle}
          />
          <ErrorMessage
            errors={errors}
            name='lastName'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <label htmlFor='email' className='flex flex-col mt-4'>
          <p className={titleStyle}>Enter Email*</p>
          <input
            {...register('email', {
              required: 'Please Enter Your Email',
            })}
            placeholder='Enter email'
            className={inputStyle}
            type='email'
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <label htmlFor='contact' className='flex flex-col mt-4'>
          <p className={titleStyle}>Contact*</p>
          <input
            {...register('contact', {
              required: 'Please Enter Your Mobile Number',
              validate: (value) =>
                isValidPhoneNum(value) || 'Phone Number Only',
            })}
            placeholder='Enter Mobile number'
            className={`${inputStyle}`}
          />
          <ErrorMessage
            errors={errors}
            name='contact'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <div className='mx-16 my-10 flex justify-around'>
          <input
            type='reset'
            className='px-20 py-2 bg-green-600 text-white font-bold rounded-lg'
          />
          <input
            type='submit'
            className='px-20 py-2 bg-green-600 text-white font-bold rounded-lg'
          />
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
