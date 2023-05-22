/*
  Warnings:

  - A unique constraint covering the columns `[questionId,ownerId]` on the table `question_likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId,ownerId]` on the table `question_votes` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `option` on the `question_votes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "question_votes" DROP COLUMN "option",
ADD COLUMN     "option" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "question_likes_questionId_ownerId_key" ON "question_likes"("questionId", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "question_votes_questionId_ownerId_key" ON "question_votes"("questionId", "ownerId");
