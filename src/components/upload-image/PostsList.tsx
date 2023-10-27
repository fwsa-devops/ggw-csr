import { Posts } from '@prisma/client';
import React from 'react';

const PostsList = ({ imageUrls = [] }: { imageUrls: Posts[] }) => {
  const imageExtensionRegex =
    /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico|jfif|jpe)$/i;

  return imageUrls.length > 0 ? (
    imageUrls.map((post) => {
      if (imageExtensionRegex.test(post.url)) {
        return (
          <div className="post post-image border border-b-2 shadow rounded-xl bg-card text-card-foreground ">
            <img src={post.url} />
          </div>
        );
      } else {
        return (
          <div className="post post-video">
            <video
              src={post.url}
              controls
              className="border border-b-2 shadow rounded-xl bg-card text-card-foreground "
            />
          </div>
        );
      }
    })
  ) : (
    <h2 className="text-2xl  text-center my-6">No posts here...</h2>
  );
};

export default PostsList;
