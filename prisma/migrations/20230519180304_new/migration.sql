-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "desc" VARCHAR(100),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "option1" VARCHAR(30) NOT NULL,
    "option2" VARCHAR(30) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "image1" TEXT,
    "image2" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_comments" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(256) NOT NULL,
    "questionId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Question_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_votes" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "option" BOOLEAN NOT NULL,

    CONSTRAINT "Question_vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_likes" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Question_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_userid_key" ON "account"("userid");

-- AddForeignKey
ALTER TABLE "question_comments" ADD CONSTRAINT "question_comments_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_comments" ADD CONSTRAINT "question_comments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_votes" ADD CONSTRAINT "question_votes_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_votes" ADD CONSTRAINT "question_votes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_likes" ADD CONSTRAINT "question_likes_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_likes" ADD CONSTRAINT "question_likes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
