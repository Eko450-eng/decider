DO $$ BEGIN
 ALTER TABLE "question_votes" ADD CONSTRAINT "question_votes_option_option_id_fk" FOREIGN KEY ("option") REFERENCES "option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
