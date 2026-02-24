import * as schema from "./schema.ts";

let _db: ReturnType<typeof import("drizzle-orm/better-sqlite3").drizzle> | ReturnType<typeof import("drizzle-orm/d1").drizzle> | null = null;

async function createDb() {
	if (import.meta.env.VITE_USE_LOCAL_DB === "true") {
		const Database = (await import("better-sqlite3")).default;
		const { drizzle } = await import("drizzle-orm/better-sqlite3");
		return drizzle(new Database("local.db"), { schema });
	}
	const { env } = await import("cloudflare:workers");
	const { drizzle } = await import("drizzle-orm/d1");
	return drizzle(env.DB, { schema });
}

export async function getDb() {
	if (!_db) {
		_db = await createDb();
	}
	return _db;
}
