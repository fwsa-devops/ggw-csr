// 'use client';

import { OurFileRouter } from '@/app/(api-routes)/api/uploadthing/core';
import { UploadDropzone } from '@uploadthing/react';
import { uploadPostToActivity } from '@/components/utils/api';

export default function UploadImageDropzone({ setImageUrls, activity }) {
  const addPostToActivity = async (imageUrls) => {
    console.log('imageUrls', imageUrls);
    const response = await uploadPostToActivity(imageUrls, activity.id);
    const finalImageUrls = imageUrls.map((imageUrl) => ({
      url: imageUrl,
    }));
    console.log('finalImageUrls', finalImageUrls);

    setImageUrls((images: string[]) => [...images, finalImageUrls]);
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
