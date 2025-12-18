// app/lib/db.ts (또는 db.ts)
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

// .env: DATABASE_URL="file:./prisma/dev.db"
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "",
});

const db = new PrismaClient({ adapter });

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
  console.log(token);
}
test();

export default db;
