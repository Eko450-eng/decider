CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" integer,
	"password" text NOT NULL,
	"createdAt" date,
	"topics" text[]
);

CREATE TABLE IF NOT EXISTS "Pushdevices" (
	"id" serial PRIMARY KEY NOT NULL,
	"device" varchar,
	"createdAt" date,
	"profileId" text
);

CREATE TABLE IF NOT EXISTS "Question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"desc" varchar(100),
	"createdAt" date,
	"option1" varchar(30) NOT NULL,
	"option2" varchar(30) NOT NULL,
	"votes1" text[] NOT NULL,
	"votes2" text[] NOT NULL,
	"likes" text[] NOT NULL,
	"posterId" text NOT NULL,
	"comments" varchar(255)[]
);

DO $$ BEGIN
 ALTER TABLE Question ADD CONSTRAINT Question_comments_Comment_id_fk FOREIGN KEY ("comments") REFERENCES Comment("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
