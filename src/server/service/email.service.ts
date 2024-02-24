'use server';

import { Event, User } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function testEmailService() {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'suryaumapathy2812@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });
  } catch (error: any) {
    throw new Error(error['message'] || error);
  }
}

export async function registeredEventEmail(toUser: User, event: Event) {
  try {
    console.log('Sending email to:', toUser.email);
    console.log('Event:', event);

    await resend.emails.send({
      from: 'Event Management <suryaumapathy@gmail.com>',
      to: toUser.email,
      subject: 'Confirmation of Registration',
      text: `
        Hi ${toUser.name},

        Congratulations! We are delighted to inform you that your registration for the upcoming ${event.name} event on ${event.startDateTime} date has been successfully completed.


        Event Details:

        Event Name: ${event.name}
        Date: ${event.startDateTime} - ${event.endDateTime}   ${event.timezone}
        Venue: to be announced

        Best,
        Event Team

        --------------------------------------------------------------------------------

        If you have any questions, please contact us at suryaumapathy@gmail.com
        `,
    });

    console.log('Email sent successfully');
  } catch (error: any) {
    console.log('Error sending email:', error);
    throw new Error(error['message'] || error);
  }
}
