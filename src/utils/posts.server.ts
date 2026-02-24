import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";

export async function getPostsFromDB() {
	const db = await getDb();
	return db.select().from(posts).all();
}

export async function createPostInDB(title: string, content: string) {
	const db = await getDb();
	const [newPost] = await db
		.insert(posts)
		.values({ title, content })
		.returning();
	return newPost;
}

export async function deletePostFromDB(id: number) {
	const db = await getDb();
	await db.delete(posts).where(eq(posts.id, id));
}
