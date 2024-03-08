
import NewLesson from '@/components/NewLesson';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';


export default async function NewLessonPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewLesson />
    </HydrationBoundary>
  );
}