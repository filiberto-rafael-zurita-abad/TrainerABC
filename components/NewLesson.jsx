'use client';


import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNewLesson,
  generateLessonResponse,
  getExistingLesson,
} from '@/utils/actions';
import toast from 'react-hot-toast';
import LessonInfo from './LessonInfo';


const NewLesson = () => {

  const queryClient = useQueryClient();

    const {
        mutate,
        isPending,
        data: lesson,
      } = useMutation({
        mutationFn: async (destination) => {
          const existingLesson = await getExistingLesson(destination);
          if (existingLesson) return existingLesson;
          const newLesson = await generateLessonResponse(destination);
          if (newLesson) {
            await createNewLesson(newLesson);
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            return newLesson;
          }
          toast.error('No matching Lesson found...');
          return null;
        },
      });
        

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());  // returns dict with enteries
    mutate(destination); 
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className=' mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='level'
            name='level'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='focus'
            name='focus'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            generate lesson
          </button>
        </div>
      </form>
      <div className='mt-16'>
      <div className='mt-16'>{lesson ? <LessonInfo lesson={lesson} /> : null}</div>
      </div>
    </>
  );
};
export default NewLesson;
