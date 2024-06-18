/*
  Warnings:

  - You are about to drop the column `createdById` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_createdById_fkey";

-- DropIndex
DROP INDEX "EventHost_eventId_userId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdById",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "EventHost" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "EventHost_pkey" PRIMARY KEY ("eventId", "userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
