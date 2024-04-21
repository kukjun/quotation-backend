-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_authorId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "commentAlarm" DROP NOT NULL,
ALTER COLUMN "quotationAlarm" DROP NOT NULL,
ALTER COLUMN "createdTime" DROP NOT NULL,
ALTER COLUMN "lastModifiedTime" DROP NOT NULL,
ALTER COLUMN "identityVerificationQuestion" DROP NOT NULL,
ALTER COLUMN "identityVerificationAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "createdTime" DROP NOT NULL,
ALTER COLUMN "lastModifiedTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quotation" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "likeCount" DROP NOT NULL,
ALTER COLUMN "shareCount" DROP NOT NULL,
ALTER COLUMN "commentCount" DROP NOT NULL,
ALTER COLUMN "createdTime" DROP NOT NULL,
ALTER COLUMN "lastModifiedTime" DROP NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
