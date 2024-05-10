import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Subject = 'english' | 'maths' | 'physics';

type Input = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: 'male' | 'female' | 'other';
  subjects: Subject[];
  resume: File;
  url: string;
  library: 'react' | 'vue' | 'angular';
  about: string;
};

function isValidPhoneNum(input: string) {
  const regex = /^\d{10,11}$/;
  return regex.test(input);
}

const urlRegex =
  /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

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
    <div className='px-10 py-5 sm:w-5/6 max-w-[900px] mx-auto'>
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
              pattern: /^\S+@\S+$/i,
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

        <label htmlFor='gender' className='flex flex-col mt-4'>
          <p className={titleStyle}>Gender*</p>
          <ErrorMessage
            errors={errors}
            name='gender'
            render={({ message }) => (
              <p className='text-red-400 font-medium -mt-3'>{message}</p>
            )}
          />
          <div className='flex justify-evenly'>
            <label htmlFor='male'>
              <input
                {...register('gender', { required: 'Please Pick One' })}
                type='radio'
                value='male'
                name='gender'
                id='male'
                className='mr-3'
              />
              Male
            </label>
            <label htmlFor='female'>
              <input
                {...register('gender', { required: 'Please Pick One' })}
                type='radio'
                value='female'
                name='gender'
                id='female'
                className='mr-3'
              />
              Female
            </label>
            <label htmlFor='other'>
              <input
                {...register('gender', { required: 'Please Pick One' })}
                type='radio'
                value='other'
                name='gender'
                id='other'
                className='mr-3'
              />
              Other
            </label>
          </div>
        </label>

        <label htmlFor='subjects' className='flex flex-col mt-4'>
          <p className={titleStyle}>Your Best Subject</p>
          <ErrorMessage
            errors={errors}
            name='subjects'
            render={({ message }) => (
              <p className='text-red-400 font-medium -mt-3'>{message}</p>
            )}
          />
          <div className='flex justify-evenly'>
            <label htmlFor='english'>
              <input
                {...register('subjects')}
                type='checkbox'
                value='english'
                id='english'
                className='mr-3'
              />
              English
            </label>
            <label htmlFor='maths'>
              <input
                {...register('subjects')}
                type='checkbox'
                value='maths'
                id='maths'
                className='mr-3'
              />
              Maths
            </label>
            <label htmlFor='physics'>
              <input
                {...register('subjects')}
                type='checkbox'
                value='physics'
                id='physics'
                className='mr-3'
              />
              Physics
            </label>
          </div>
        </label>

        <label htmlFor='resume' className='flex flex-col mt-4'>
          <p className={titleStyle}>Upload Resume*</p>
          <input
            {...register('resume', {
              // required: 'Please Upload Your Resume',
            })}
            placeholder=''
            className={`${inputStyle}`}
            type='file'
          />
          <ErrorMessage
            errors={errors}
            name='resume'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <label htmlFor='url' className='flex flex-col mt-4'>
          <p className={titleStyle}>Enter Url*</p>
          <input
            {...register('url', {
              required: 'Please Enter Your Website Url',
              pattern: {
                value: urlRegex,
                message: 'Please enter a valid URL format',
              },
            })}
            placeholder='Enter url'
            className={`${inputStyle}`}
            type='url'
          />
          <ErrorMessage
            errors={errors}
            name='url'
            render={({ message }) => (
              <p className='text-red-400 font-medium'>{message}</p>
            )}
          />
        </label>

        <label htmlFor='library' className='flex flex-col mt-4'>
          <p className={titleStyle}>Select your favorite library choice*</p>
          <select
            {...register('library', {
              required: 'Please Select Your Favorite Library',
            })}
            className={`${inputStyle}`}
          >
            <option value='react'>React</option>
            <option value='vue'>Vue</option>
            <option value='angular'>Angular</option>
          </select>
        </label>

        <label htmlFor='about' className='flex flex-col mt-4'>
          <p className={titleStyle}>About</p>
          <textarea
            {...register('about')}
            placeholder='About yourself'
            className={`${inputStyle} `}
            rows={8}
          />
        </label>

        <div className='my-5 sm:mx-16 sm:my-10 flex justify-around'>
          <input
            type='reset'
            className='px-5 md:px-20 py-2 bg-green-600 text-white font-bold rounded-lg'
          />
          <input
            type='submit'
            className='px-5 md:px-20 py-2 bg-green-600 text-white font-bold rounded-lg'
          />
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
