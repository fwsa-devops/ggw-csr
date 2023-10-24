'use client';

import "@blocknote/core/style.css";
import BlockNote from '@/components/editors/blocknote';

const HomepageViewer = ({ body }: { body: string }) => {

  return (
    <div className="mt-10">
      <BlockNote
        onChange={() => { }}
        editable={false}
        initialContent={body}
      />
    </div>
  )

}

export default HomepageViewer;