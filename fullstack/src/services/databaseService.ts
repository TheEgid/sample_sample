import { type User, PrismaClient } from "generated";

export type IUser = User;

const DATABASE_URL = "file:./database.db";

const prisma = new PrismaClient({
    datasources: { db: { url: DATABASE_URL } },
    log: ["query", "info", "warn", "error"],
});

export default prisma;
