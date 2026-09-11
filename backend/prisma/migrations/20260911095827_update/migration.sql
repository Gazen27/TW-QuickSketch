-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sketch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drawing" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "guessCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Sketch_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Sketch_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sketch" ("authorId", "drawing", "guessCount", "id", "wordId") SELECT "authorId", "drawing", "guessCount", "id", "wordId" FROM "Sketch";
DROP TABLE "Sketch";
ALTER TABLE "new_Sketch" RENAME TO "Sketch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
