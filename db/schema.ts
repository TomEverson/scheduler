import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { pgTable, serial, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core"

export const meeting = pgTable("MeetingTable", {
    id: serial("Id").primaryKey(),
    startTime: integer("StartTime").notNull(),
    endTime: integer("EndTime").notNull(),
    booked: boolean("Booked").default(false).notNull(),
    day: integer("Day").notNull(),
})

export type Meeting = InferSelectModel<typeof meeting>
export type NewMeeting = InferInsertModel<typeof meeting>