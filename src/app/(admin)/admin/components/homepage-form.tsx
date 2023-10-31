'use client';

import { useEffect, useState } from 'react';
import BlockNoteEditor from '@/components/editors/blocknote';
import { Button } from '@/components/ui/button';
import { createHomepageContent } from '@/components/utils/api';
import { CheckIcon, X } from 'lucide-react';

const HomePage = ({ initialContent = '' }) => {

  const [isLoaded, setLoaded] = useState(false);
  const [content, setContent] = useState<any>();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  const onChange = async (editor: any) => {
    // console.log(JSON.stringify(editor.topLevelBlocks));
    setContent(JSON.stringify(editor.topLevelBlocks));
  };

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    console.log(content);
    try {

      const formData = {
        status: 'OPEN',
        body: content,
      };

      const res = await createHomepageContent(formData);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="py-10">
        <div className="block w-full">
          <BlockNoteEditor
            editable={true}
            initialContent={initialContent}
            onChange={onChange}
          />
        </div>

        <div className="w-full mt-10 flex justify-end">
          <Button
            variant={'default'}
            type="submit"
            className="ml-4"
            disabled={isSubmitting}
          >
            <CheckIcon size={18} className="mr-2" />
            Save
          </Button>

          <Button
            variant={'destructive'}
            type="reset"
            className="ml-4"
            disabled={isSubmitting}
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default HomePage;