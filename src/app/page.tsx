import Link from 'next/link';
import React from 'react';

const HelloWorldPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-8 pt-6 md:p-8">
      <h1>Volunteering-Event-Management</h1>
      <Link href={"/new"}> Create Event </Link>
    </div>
  );
};

export default HelloWorldPage;
