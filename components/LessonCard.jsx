import Link from 'next/link';


const LessonCard = ({ lesson }) => {
  const { level, id, focus } = lesson;

  return (
    <Link
      href={`/lessons/${id}`}
      className='card card-compact rounded-xl bg-base-100'
    >
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-center'>
          {level}: {focus}
        </h2>
      </div>
    </Link>
  );
};
export default LessonCard;
