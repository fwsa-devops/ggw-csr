/*
  Warnings:

  - You are about to drop the column `feedbackId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `activity_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Asset_feedbackId_idx` ON `Asset`;

-- DropIndex
DROP INDEX `Feedback_activityId_idx` ON `Feedback`;

-- DropIndex
DROP INDEX `Feedback_eventId_idx` ON `Feedback`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `feedbackId`,
    ADD COLUMN `feedback_id` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Feedback` DROP COLUMN `activityId`,
    DROP COLUMN `eventId`,
    ADD COLUMN `activity_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `event_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Asset_feedback_id_idx` ON `Asset`(`feedback_id`);

-- CreateIndex
CREATE INDEX `Feedback_event_id_idx` ON `Feedback`(`event_id`);

-- CreateIndex
CREATE INDEX `Feedback_activity_id_idx` ON `Feedback`(`activity_id`);

-- CreateIndex
CREATE INDEX `Feedback_author_id_idx` ON `Feedback`(`author_id`);
