import { PrismaClient } from "./generated/prisma-client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// const databaseHost = process.platform === "win32" ? "localhost" : "full_db_postgres";

const DATABASE_URL = "file:./database.db";

const prisma
    = globalForPrisma.prisma
        || new PrismaClient({
            datasources: { db: { url: DATABASE_URL } },
            log: ["query", "info", "warn", "error"],
        });

export default prisma;
