import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import EventForm from './components/form';

export default async function Event() {
  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
      <h1>Create new Event</h1>

      <EventForm />

    </div>
  );
}

