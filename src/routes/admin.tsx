import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { createPost, deletePost, getPosts } from "@/utils/posts.functions";

export const Route = createFileRoute("/admin")({
	component: AdminPage,
	loader: async () => await getPosts(),
});

function AdminPage() {
	const postsList = Route.useLoaderData();

	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const titleId = useId();
	const contentId = useId();

	const createPostFn = useServerFn(createPost);
	const deletePostFn = useServerFn(deletePost);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		const formData = new FormData(e.currentTarget);
		const data = {
			title: formData.get("title") as string,
			content: formData.get("content") as string,
		};

		try {
			await createPostFn({ data });

			await router.invalidate();
			(e.currentTarget as HTMLFormElement).reset();
		} catch (err) {
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				await deletePostFn({ data: { id } });
				await router.invalidate();
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className="container mx-auto p-6 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<Button variant="outline" asChild>
					<Link title="Home" to="/">
						View Site
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle>Create New Post</CardTitle>
							<CardDescription>
								Share your latest coffee adventure.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={titleId}>Title</Label>
									<Input
										id={titleId}
										name="title"
										placeholder="Post Title"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={contentId}>Content</Label>
									<Textarea
										id={contentId}
										name="content"
										placeholder="Write your content here..."
										required
										className="min-h-37.5"
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Creating..." : "Create Post"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Existing Posts</CardTitle>
							<CardDescription>Manage your journal entries.</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Title</TableHead>
										<TableHead>Created At</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{postsList.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={3}
												className="text-center text-muted-foreground"
											>
												No posts found.
											</TableCell>
										</TableRow>
									) : (
										postsList.map((post) => (
											<TableRow key={post.id}>
												<TableCell className="font-medium">
													{post.title}
												</TableCell>
												<TableCell>
													{post.createdAt
														? new Date(post.createdAt).toLocaleDateString()
														: "N/A"}
												</TableCell>
												<TableCell className="text-right">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleDelete(post.id)}
														className="text-destructive hover:text-destructive hover:bg-destructive/10"
													>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Delete</span>
													</Button>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
