import LessonsPage from '@/components/LessonsPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllLessons } from '@/utils/actions';
export default async function AllLessonsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['lessons'],
    queryFn: () => getAllLessons(),
  });
  return (   
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonsPage />
    </HydrationBoundary>
  );
}