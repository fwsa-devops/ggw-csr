'use client';

import React from 'react';
import EventList from '../core/EventList';
import ActivityPreview from '../core/ActivityPreview';
import { IActivity } from '@/types';
import UploadImageDropzone from '../upload-image/page';
import PostsList from '../upload-image/PostsList';

const EventPage = (props: { activity: IActivity }) => {
  const { activity } = props;

  const [imageUrls, setImageUrls] = React.useState([]); // replace [] with activity.imageUrls

  return (
    <div
      className="container h-auto px-0 mx-auto mb-10 w-100 bg-grey"
      key={activity.id}
    >
      <ActivityPreview activity={activity} />
      <EventList events={activity.events} size="lg" />
      {/* Add Upload files component here  */}
      <PostsList imageUrls={imageUrls} />
      <UploadImageDropzone imageUrls={imageUrls} setImageUrls={setImageUrls} />
    </div>
  );
};

export default EventPage;
