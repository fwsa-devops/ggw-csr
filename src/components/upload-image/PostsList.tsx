import React from 'react';

const PostsList = ({ imageUrls = [] }: { imageUrls: string[] }) => {
  const imageExtensionRegex =
    /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico|jfif|jpe)$/i;

  return imageUrls.map((image) => {
    if (imageExtensionRegex.test(image)) {
      console.log("It's an image.");
      return (
        <>
          Image:
          <img src={image} />
        </>
      );
    } else {
      console.log("It's not an image.");
      return (
        <>
          Video:
          <video src={image} controls />
        </>
      );
    }
  });
};

export default PostsList;
