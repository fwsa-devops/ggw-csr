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

  const hasan = await prisma.user.create({
    data: { email: 'mohammed.hasan@freshworks.com' },
  });
  const mukesh = await prisma.user.create({
    data: { email: 'mukesh.swamy@freshworks.com' },
  });
  // console.log({ mukesh, hasan });
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
