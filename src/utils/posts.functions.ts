import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPostInDB, getPostsFromDB } from "./posts.server";

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
