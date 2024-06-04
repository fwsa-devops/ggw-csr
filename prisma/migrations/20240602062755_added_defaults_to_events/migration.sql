-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "timezone" SET DEFAULT 'Asia/Calcutta';

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "timezone" SET DEFAULT 'Asia/Calcutta',
ALTER COLUMN "isPublic" SET DEFAULT true;
