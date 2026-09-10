/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sketchCount" INTEGER NOT NULL DEFAULT 0,
    "drawingScore" REAL NOT NULL DEFAULT 0,
    "guessedScore" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("drawingScore", "guessedScore", "id", "password", "sketchCount", "username") SELECT "drawingScore", "guessedScore", "id", "password", "sketchCount", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
