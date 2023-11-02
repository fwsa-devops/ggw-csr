/*
  Warnings:

  - You are about to drop the column `feedback_id` on the `Asset` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Asset_feedback_id_idx` ON `Asset`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `feedback_id`;

-- CreateTable
CREATE TABLE `FeedbackAssets` (
    `id` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `feedbackId` VARCHAR(191) NOT NULL,

    INDEX `FeedbackAssets_assetId_idx`(`assetId`),
    INDEX `FeedbackAssets_feedbackId_idx`(`feedbackId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
