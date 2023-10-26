import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // const mukesh = await prisma.user.upsert({
  //   where: { email: 'mukesh.swamy@freshworks.com' },
  //   update: {},
  //   create: {
  //     name: 'Mukesh Swamy',
  //     email: 'mukesh.swamy@freshworks.com',
  //     activites: {
  //       create: [
  //         {
  //           name: 'Educate a child - make a life',
  //           cover:
  //             'https://assets.telegraphindia.com/telegraph/2022/Nov/1667806098_untitled-design-51.jpg',
  //           description:
  //             'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //           published: true,
  //           startTime: new Date('2023-10-12T10:00:00.000Z'),
  //           endTime: new Date('2023-10-26T10:00:00.000Z'),
  //           place: 'ONLINE',
  //           tags: {
  //             create: [
  //               {
  //                 name: 'Education',
  //               },
  //               {
  //                 name: 'Children',
  //               },
  //             ],
  //           },
  //           events: {
  //             create: [
  //               {
  //                 description:
  //                   'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //                 address: 'Neelankarai',
  //                 published: true,
  //                 startTime: new Date('2023-10-12T10:00:00.000Z'),
  //                 endTime: new Date('2023-10-26T10:00:00.000Z'),
  //                 place: 'ONLINE',
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
  // const hasan = await prisma.user.create({
  //   data: { name: "Mohammed Hasan", email: 'mohammed.hasan@freshworks.com' },
  // });
  // const mukesh = await prisma.user.create({
  //   data: { name: "Mukesh Swamy", email: 'mukesh.swamy@freshworks.com' },
  // });
  // const surya = await prisma.user.create({
  //   data: { name: "Surya Umapathy", email: 'surya.umapathy@ctr.freshworks.com' },
  // });
  //  const surya = await prisma.user.create({
  //   data: { name: "Surya Umapathy", email: 'suryaumapathy2812@gmail.com' },
  // });
  // console.log({ mukesh, hasan, surya });
  // const activities = await prisma.activity.findMany(
  //   {
  //     "take": 100,
  //     "skip": 0,
  //     "select": {
  //       "id": true,
  //       "name": true,
  //       "cover": true,
  //       "description": true,
  //       "summary": true,
  //       "duration": true,
  //       "city": true,
  //       "status": true,
  //       "author_id": true,
  //       "author": true,
  //       "events": {
  //         "select": {
  //           "id": true
  //         }
  //       },
  //       "tags": {
  //         "select": {
  //           "id": true
  //         }
  //       }
  //     }
  //   });
  // console.log(activities);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
