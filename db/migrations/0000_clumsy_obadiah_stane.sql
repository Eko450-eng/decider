CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20),
	"email" varchar(255),
	"role" integer,
	"password" text,
	"createdAt" date,
	"topics" text[]
);

CREATE TABLE IF NOT EXISTS "Pushdevices" (
	"id" serial PRIMARY KEY NOT NULL,
	"device" varchar,
	"createdAt" date,
	"profileId" integer
);

CREATE TABLE IF NOT EXISTS "Question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100),
	"desc" varchar(100),
	"createdAt" date,
	"option1" varchar(30),
	"option2" varchar(30),
	"votes1" integer[],
	"votes2" integer[],
	"likes" integer[],
	"posterId" integer,
	"comments" varchar(255)[]
);

DO $$ BEGIN
 ALTER TABLE "Question" ADD CONSTRAINT Question_comments_Comment_id_fk FOREIGN KEY ("comments") REFERENCES Comment("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
