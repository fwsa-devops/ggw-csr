'use client';

import { UploadDropzone } from '@/components/utils/uploadthing';
import { UploadFileResponse } from 'uploadthing/client';

const FileUpload = ({
  onChange,
}: {
  onChange?: (value: UploadFileResponse[] | undefined) => void;
}) => {
  return (
    <>
      <div className="">
        <UploadDropzone
          className=""
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            // console.log('Files: ', res);
            onChange?.(res);
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
    </>
  );
};

export default FileUpload;
