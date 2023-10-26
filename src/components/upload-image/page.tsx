// 'use client';

import { OurFileRouter } from '@/app/(api-routes)/api/uploadthing/core';
import { UploadDropzone } from '@uploadthing/react';

export default function UploadImageDropzone({ setImageUrls, imageUrls }) {
  const addPostToActivity = async (imageUrls) => {
    console.log('imageUrls', imageUrls);
    setImageUrls((images: string[]) => [...images, imageUrls]);
  };

  return (
    <div className="text-blue-500">
      <UploadDropzone<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(images) => {
          // Need to store the image url in activity model as string[]
          console.log('Files: ', images);
          addPostToActivity(images?.map((image) => image.url));
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log('Uploading: ', name);
        }}
      />
    </div>
  );
}
