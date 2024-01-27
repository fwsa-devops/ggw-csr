import Link from 'next/link';
import React from 'react';

const HelloWorldPage: React.FC = () => {
  return (
    <div>
      <h1>Volunteering-Event-Management</h1>
      <Link href={"/new"}> Create Event </Link>
    </div>
  );
};

export default HelloWorldPage;
