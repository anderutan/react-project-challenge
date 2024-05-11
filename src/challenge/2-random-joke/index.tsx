import { useEffect, useState } from 'react';

type Flag = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

type Jokes = {
  error: boolean;
  category: string;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: Flag;
  safe: boolean;
  id: number;
  lang: string;
};

const RandomJoke = () => {
  const [jokeData, setJokeData] = useState<Jokes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [newJoke, setNewJoke] = useState<boolean>(false);
  const [revealJoke, setRevealJoke] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data: Jokes = await res.json();
        setJokeData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'There is something wrong.';
        setIsError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newJoke) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch('https://v2.jokeapi.dev/joke/Any');
          const data: Jokes = await res.json();
          setJokeData(data);
          setNewJoke(false);
          setRevealJoke(false);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'There is something wrong.';
          setIsError(message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [newJoke]);

  if (isLoading) {
    return (
      <h1 className='text-2xl font-semibold '>
        Data Loading....Please wait...
      </h1>
    );
  }

  if (isError) {
    return <h1>{`Error message: ${isError}`}</h1>;
  }

  if (jokeData) {
    return (
      <div className='bg-green-900 h-screen text-white flex flex-col gap-10 justify-center items-center'>
        <h1 className='text-3xl font-bold text-center'>
          Joke Generator Using React and Joke API
        </h1>
        <button
          onClick={() => setNewJoke(true)}
          className='px-8 py-4 bg-green-400 text-xl font-semibold rounded-xl '
        >
          Click to Generate a joke!
        </button>
        {/* IF TYPE IS SINGLE */}
        {jokeData && jokeData.type === 'single' ? (
          <div className='flex flex-col gap-5 items-center border-t-2 pt-10 border-t-white w-full'>
            <p className='text-xl mx-10 font-semibold'>{`The Joke: ${jokeData.joke}`}</p>
          </div>
        ) : (
          // IF TYPE IS TWOPART
          <div className='flex flex-col gap-5 items-center border-t-2 pt-10 border-t-white w-full'>
            <p className='text-xl mx-10 font-semibold'>{`The Joke: ${jokeData?.setup}`}</p>
            {revealJoke && (
              <p className='text-lg mx-10 px-2 py-1 bg-yellow-400 text-black'>
                {jokeData?.delivery}
              </p>
            )}
            {!revealJoke && (
              <button
                onClick={() => setRevealJoke(true)}
                className='px-4 py-2 bg-yellow-400 text-lg font-semibold rounded-xl text-black'
              >
                Click to Reveal Punchline
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default RandomJoke;
