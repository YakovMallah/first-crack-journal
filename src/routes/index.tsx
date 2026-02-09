import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db/index.ts";
import { posts } from "@/db/schema.ts";

const getEntries = createServerFn({ method: "GET" }).handler(async () => {
	return await db.select().from(posts).all();
});

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getEntries(),
});

function App() {
	const postsList = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
			<div className="max-w-2xl">
				<h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
					First Crack Journal
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed mb-8">
					Follow my journey as I dive deep into the world of coffee. From
					professional courses and tasting sessions to unique café experiences,
					this is a record of everything I'm learning about the craft and
					culture of coffee.
				</p>

				<div className="mt-8 text-left">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Recent Posts
					</h2>
					{postsList.length === 0 ? (
						<p className="text-muted-foreground text-center">
							No posts yet. Start brewing!
						</p>
					) : (
						<ul className="space-y-4">
							{postsList.map((post) => (
								<li
									key={post.id}
									className="p-4 border border-border rounded-lg shadow-sm"
								>
									<h3 className="text-xl font-bold">{post.title}</h3>
									<p className="mt-2 text-muted-foreground">{post.content}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
