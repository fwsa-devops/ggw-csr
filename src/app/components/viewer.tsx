// import BlockNote from '@/components/editors/blocknote';
import '@blocknote/core/style.css';
import dynamic from 'next/dynamic';

export const BlockNote = dynamic(
  () => import('@/components/editors/blocknote'),
  {
    ssr: false,
  },
);

const HomepageViewer = ({ body }: { body: string }) => {
  return (
    <div className="mt-10">
      <BlockNote editable={false} initialContent={body} />
    </div>
  );
};

export default HomepageViewer;
