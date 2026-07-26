import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing.");
}

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

export default prisma;