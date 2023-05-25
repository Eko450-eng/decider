import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, boolean, date, integer } from "drizzle-orm/pg-core"

export const Question = pgTable("question", {
	id: serial("id").notNull().primaryKey(),
	title: varchar("title", { length: 100 }).notNull(),
	desc: varchar("desc", { length: 100 }),
	createdAt: timestamp("createdAt", { precision: 6, mode: 'string' }).defaultNow(),
	option1: varchar("option1", { length: 30 }).notNull(),
	option2: varchar("option2", { length: 30 }).notNull(),
	ownerId: text("ownerId").notNull(),
	image1: text("image1"),
	image2: text("image2"),
	isDeleted: boolean("isDeleted").notNull(),
});

export const Pushdevices = pgTable("Pushdevices", {
	id: serial("id").notNull().primaryKey(),
	device: varchar("device"),
	createdAt: date("createdAt"),
	profileId: text("profileId"),
});

export const QuestionComments = pgTable("question_comments", {
	id: serial("id").notNull().primaryKey(),
	comment: varchar("comment", { length: 256 }).notNull(),
	questionId: integer("questionId").notNull(),
	isDeleted: boolean("isDeleted").notNull(),
	ownerId: text("ownerId").notNull(),
});

export const QuestionVotes = pgTable("question_votes", {
	id: serial("id").notNull().primaryKey(),
	questionId: integer("questionId").notNull().references(()=>Question.id),
	ownerId: text("ownerId").notNull(),
	option: integer("option").notNull(),
});

export const Comment = pgTable("Comment", {
	id: serial("id").notNull().primaryKey(),
});

export const QuestionLikes = pgTable("question_likes", {
	id: serial("id").notNull().primaryKey(),
	questionId: integer("question_id").notNull().references(()=>Question.id),
	ownerId: text("ownerId").notNull(),
});

export const questionRelations = relations(Question, ({many})=>({
  votes: many(QuestionVotes),
  likes: many(QuestionLikes)
}))

export const likesRelation = relations(QuestionLikes, ({one})=>({
  question:   one(Question, {fields: [QuestionLikes.questionId], references: [Question.id]})
}))

export const votesRelation = relations(QuestionVotes, ({one})=>({
  question:   one(Question, {fields: [QuestionVotes.questionId], references: [Question.id]})
}))
