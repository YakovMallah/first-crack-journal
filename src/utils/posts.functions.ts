import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
	createPostInDB,
	deletePostFromDB,
	getPostsFromDB,
} from "./posts.server";

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
	return await getPostsFromDB();
});

const PostSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export const createPost = createServerFn({ method: "POST" })
	.inputValidator(PostSchema)
	.handler(async ({ data }) => {
		return await createPostInDB(data.title, data.content);
	});

export const deletePost = createServerFn({ method: "POST" })
	.inputValidator(z.object({ id: z.number() }))
	.handler(async ({ data }) => {
		return await deletePostFromDB(data.id);
	});
