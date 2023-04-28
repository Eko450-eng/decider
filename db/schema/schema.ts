import { InferModel } from 'drizzle-orm'
import { integer, pgTable, date, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const Profile = pgTable("Profile", {
  id: serial("id").primaryKey().notNull(),
  // Unique
  username: varchar("username", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: integer("role"),
  password: text("password").notNull(),
  createdAt: date("createdAt"),

  topics: text("topics").array()

  // questions    Question[]
  // questions: RelationOneToMany
  // push_devices Pushdevices[]
  // comments     Comment[]
}
)

export const Question = pgTable("Question", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  desc: varchar("desc", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),

  image1: text("image1"),
  image2: text("image2"),

  option1: varchar("option1", { length: 30 }).notNull(),
  option2: varchar("option2", { length: 30 }).notNull(),

  votes1: text("votes1").array().notNull(),
  votes2: text("votes2").array().notNull(),

  likes: text("likes").array().notNull(),

  // poster   Profile   @relation(fields: [posterId], references: [id])
  posterId: text("posterId").notNull(),
  // comments: Comment[]
  comments: varchar("comments", { length: 255 }).array().references(() => Comment.id)
}
)

export const Comment = pgTable("Comment", {
  id: serial("id").primaryKey().notNull(),
  // message   String @db.VarChar(200)
  // createdAt DateTime @default(now())

  // commentor   Profile @relation(fields: [commentorId], references: [id])
  // commentorId Int

  // thread   Question @relation(fields: [threadId], references: [id])
  // threadId Int
})

export const Pushdevices = pgTable("Pushdevices", {
  id: serial("id").primaryKey(),
  // unique
  device: varchar("device"),
  createdAt: date("createdAt"),

  // profile   Profile @relation(fields: [profileId], references: [id])
  profileId: text("profileId")
})

export type Profile = InferModel<typeof Profile>
export type NewProfile = InferModel<typeof Profile, "insert">
export type Comment = InferModel<typeof Comment>
export type NewComment = InferModel<typeof Comment, "insert">
export type Question = InferModel<typeof Question>
export type NewQuestion = InferModel<typeof Question, "insert">
export type Pushdevices = InferModel<typeof Pushdevices>
export type NewPushdevices = InferModel<typeof Pushdevices, "insert">
