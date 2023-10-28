import { readFileSync } from 'fs'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
async function main() {

  const jsonString = readFileSync('./sample.json', { encoding: 'utf-8' })

  const {
    homepage,
    users,
    tags,
    activites,
    activityTags,
    events,
    eventLeaders,
    volunteers,
  }: any = JSON.parse(jsonString);

  await prisma.homepage.createMany({ data: homepage });
  await prisma.user.createMany({ data: users });
  await prisma.tag.createMany({ data: tags });
  await prisma.activity.createMany({ data: activites });
  await prisma.activityTags.createMany({ data: activityTags });

  await prisma.event.createMany({ data: events });
  await prisma.eventLeader.createMany({ data: eventLeaders });
  await prisma.volunteers.createMany({ data: volunteers });


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
