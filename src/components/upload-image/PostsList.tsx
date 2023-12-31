import { Asset } from '@prisma/client';
import React from 'react';
import ExpandImageOnClick from 'react-medium-image-zoom';

const PostsList = ({ imageUrls: assets = [] }: { imageUrls: Asset[] }) => {
  const imageExtensionRegex =
    /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico|jfif|jpe)$/i;

  return (
    assets.length > 0 ??
    assets.map((assetUrl) => {
      {
        JSON.stringify(assetUrl);
      }

      if (imageExtensionRegex.test(assetUrl.url)) {
        return (
          <div className="bg-card text-card-foreground" key={assetUrl.id}>
            <ExpandImageOnClick>
              <img
                loading="lazy"
                src={assetUrl.url}
                className="aspect-video object-cover object-center max-w-full md:w-56 rounded"
              />
            </ExpandImageOnClick>
          </div>
        );
      } else {
        return (
          <div className="" key={assetUrl.id}>
            <video
              src={assetUrl.url}
              controls
              className="aspect-video md:w-56 rounded-xl bg-card text-card-foreground "
            />
          </div>
        );
      }
    })
  );
};

export default PostsList;
