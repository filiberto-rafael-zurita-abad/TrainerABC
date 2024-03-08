'use client';
import { getAllLessons } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LessonsList from './LessonsList';

const LessonsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['lessons', searchValue],
    queryFn: () => getAllLessons(searchValue),
  });

  return (
    <>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='enter level or focus here..'
            className='input input-bordered join-item w-full'
            name='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className='btn btn-primary join-item'
            type='button'
            disabled={isPending}
            onClick={() => setSearchValue('')}
          >
            {isPending ? 'please wait' : 'reset'}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className=' loading'></span>
      ) : (
        <LessonsList data={data} />
      )}
    </>
  );
};
export default LessonsPage;