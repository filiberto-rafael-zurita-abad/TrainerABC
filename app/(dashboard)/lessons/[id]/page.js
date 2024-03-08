import LessonInfo from '@/components/LessonInfo';
import { generateLessonImage, getSingleLesson } from '@/utils/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`; 


const SingleLessonPage = async ({ params }) => {
  
    const lesson = await getSingleLesson(params.id);
  
    if (!lesson) {
        redirect('/lessons');
    }
    
    const {data} = await axios.get(`${url}${lesson.focus}`);
    const lessonImage = data?.results[0]?.urls?.raw;

  
  return (
    <div>
      <Link href='/lessons' className='btn btn-secondary mb-12'>
        back to lessons
      </Link>

      {lessonImage ? (
        <div>
          <Image
            src={lessonImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={lesson.title}
            priority
          />
        </div>
      ) : null}

      

      <LessonInfo lesson={lesson} />
    </div>
  );
};
export default SingleLessonPage;