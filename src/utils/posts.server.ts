import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";

export async function getPostsFromDB() {
	return db.select().from(posts).all();
}

export async function createPostInDB(title: string, content: string) {
	const [newPost] = await db
		.insert(posts)
		.values({ title, content })
		.returning();
	return newPost;
}

export async function deletePostFromDB(id: number) {
	await db.delete(posts).where(eq(posts.id, id));
}
