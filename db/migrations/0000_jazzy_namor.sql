CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(100) NOT NULL,
	"user_id" text NOT NULL,
	"role" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "option" (
	"id" serial PRIMARY KEY NOT NULL,
	"option1" varchar(30) NOT NULL,
	"image1" text,
	"questionId" integer NOT NULL,
	"ownerId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Pushdevices" (
	"id" serial PRIMARY KEY NOT NULL,
	"device" varchar,
	"createdAt" date,
	"profileId" text
);

CREATE TABLE IF NOT EXISTS "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"desc" varchar(100),
	"createdAt" timestamp(6) DEFAULT now(),
	"ownerId" text NOT NULL,
	"isDeleted" boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS "question_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" varchar(256) NOT NULL,
	"questionId" integer NOT NULL,
	"isDeleted" boolean NOT NULL,
	"ownerId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "question_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer NOT NULL,
	"ownerId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "question_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"questionId" integer NOT NULL,
	"ownerId" text NOT NULL,
	"option" integer NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "option" ADD CONSTRAINT "option_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "question_likes" ADD CONSTRAINT "question_likes_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "question_votes" ADD CONSTRAINT "question_votes_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "question_votes" ADD CONSTRAINT "question_votes_option_option_id_fk" FOREIGN KEY ("option") REFERENCES "option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
