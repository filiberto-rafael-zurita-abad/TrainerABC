import Link from 'next/link';
const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>TrainerABC</h1>
          <p className='py-6 text-lg leading-loose'>
              AI generated content for ESL students and teacher.
          </p>
          <Link href='/lessons' className='btn btn-secondary '>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;