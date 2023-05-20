-- DropForeignKey
ALTER TABLE "question_comments" DROP CONSTRAINT "question_comments_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "question_likes" DROP CONSTRAINT "question_likes_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "question_votes" DROP CONSTRAINT "question_votes_ownerId_fkey";

-- AlterTable
ALTER TABLE "question_comments" ALTER COLUMN "ownerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "question_likes" ALTER COLUMN "ownerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "question_votes" ALTER COLUMN "ownerId" SET DATA TYPE TEXT;
