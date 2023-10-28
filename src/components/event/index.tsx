'use client';

import React from 'react';
import EventList from '../core/EventList';
import ActivityPreview from '../core/ActivityPreview';
import { IActivity } from '@/types';

const EventPage = (props: { activity: IActivity }) => {
  const { activity } = props;

  const [imageUrls, setImageUrls] = React.useState(activity.posts || []); // replace [] with activity.imageUrls

  return (
    <div
      className="container h-auto px-0 mx-auto mb-10 w-100 bg-grey"
      key={activity.id}
    >
      <ActivityPreview activity={activity} />
      <EventList events={activity.events} size="lg" />

      {/* <PostsList imageUrls={imageUrls} />
      <UploadImageDropzone setImageUrls={setImageUrls} activity={activity} /> */}
    </div>
  );
};

export default EventPage;
