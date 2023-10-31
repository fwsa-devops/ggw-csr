import prisma from '@/lib/prisma';
import HomepageForm from '../components/homepage-form';

const HomePage = async () => {
  const homepageContent = await prisma.homepage.findFirst({
    orderBy: {
      created_at: 'desc',
    },
    take: 1,
  });

  return (
    <>
      <HomepageForm initialContent={homepageContent?.body ?? '[]'} />
    </>
  );
};

export default HomePage;
