import { useRouter } from 'next/router';
import React from 'react';

const EventDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <div>EventDetail = {slug}</div>;
};

export default EventDetail;
