import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, boolean, date, integer } from "drizzle-orm/pg-core"

export const Accounts = pgTable("accounts", {
	id: serial("id").notNull().primaryKey(),
	userName: varchar("user_name", { length: 100 }).notNull(),
  userId: text("user_id").notNull(),
  role: integer("role").default(0)
})

export const Question = pgTable("question", {
	id: serial("id").notNull().primaryKey(),
	title: varchar("title", { length: 100 }).notNull(),
	desc: varchar("desc", { length: 100 }),
	createdAt: timestamp("createdAt", { precision: 6, mode: 'string' }).defaultNow(),
	ownerId: text("ownerId").notNull(),
	isDeleted: boolean("isDeleted").notNull(),
});

export const Option = pgTable("option", {
	id: serial("id").notNull().primaryKey(),
  name: varchar("option1", { length: 30 }).notNull(),
	image: text("image1"),

	questionId: integer("questionId").notNull().references(()=>Question.id),
	ownerId: text("ownerId").notNull(),
})


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
	option: integer("option").notNull().references(()=>Option.id)
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
  likes: many(QuestionLikes),
  option: many(Option)
}))

export const likesRelation = relations(QuestionLikes, ({one})=>({
  question:   one(Question, {fields: [QuestionLikes.questionId], references: [Question.id]})
}))

export const votesRelation = relations(QuestionVotes, ({one})=>({
  question:   one(Question, {fields: [QuestionVotes.questionId], references: [Question.id]}),
  option:   one(Option, {fields: [QuestionVotes.questionId], references: [Option.id]})
}))

export const optionRelation = relations(Option, ({one})=>({
  question:   one(Question, {fields: [Option.questionId], references: [Question.id]})
}))
