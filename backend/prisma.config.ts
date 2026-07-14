/// <reference types='node' />
import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("La variabile d'ambiente DATABASE_URL non è definita.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {path: "prisma/migrations"},
  datasource: {url: databaseUrl}
});