import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});
