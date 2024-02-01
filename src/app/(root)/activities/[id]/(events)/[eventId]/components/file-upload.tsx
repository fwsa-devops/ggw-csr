'use client';

import { UploadDropzone } from '@/components/utils/uploadthing';
import Image from 'next/image';
import { useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';

const FileUpload = ({
  onChange,
}: {
  onChange?: (value: UploadFileResponse[] | undefined) => void;
}) => {

  const [files, setFiles] = useState<UploadFileResponse[] | undefined>(undefined);

  return (
    <>
      <div className="">
        <UploadDropzone
          className=""
          endpoint="imageUploader"
          config={
            {
              mode: 'auto',
              appendOnPaste: true,
            }
          }
          onClientUploadComplete={(res) => {
            // Do something with the response
            // console.log('Files: ', res);

            if (res && res.length > 0) {
              setFiles(prev => {
                if (prev) {
                  onChange?.([...prev, ...res]);
                  return [...prev, ...res];
                }
                onChange?.(res);
                return res;
              });
            }

          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            // Do something once upload begins
            // console.log('Uploading: ', name);
          }}
        // onUploadProgress={(name) => {
        //   // Do something once upload begins
        //   // console.log('Uploading: ', name);
        // }}
        />
      </div>

      <ul className='flex space-x-2 gap-2'>
        {files && files.map((_f, i) =>

          <li key={+i} className='p-2'>
            <Image src={_f.url} width={100} height={100} alt={_f.name} className='max-w-[100px] h-[60px] object-contain' />
            <span className='text-xs'>
              {_f.name}
            </span>
          </li>

        )}
      </ul>

    </>
  );
};

export default FileUpload;
