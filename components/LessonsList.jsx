import LessonCard from './LessonCard';

const LessonsList = ({ data }) => {
  if (data.length === 0) return <h4 className='text-lg '>No tours found...</h4>;

  return (
    <div className='grid sm:grid-cols-2  lg:grid-cols-4 gap-8'>
      {data.map((lesson) => {
        return <LessonCard key={lesson.id} lesson={lesson} />;
      })}
    </div>
  );
};
export default LessonsList;



