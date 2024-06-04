/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `Location` table. All the data in the column will be lost.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `addressId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "timezone",
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "addressId" SET NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "name",
DROP COLUMN "state",
DROP COLUMN "timezone",
DROP COLUMN "zipcode";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
