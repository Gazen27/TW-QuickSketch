-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sketchCount" INTEGER NOT NULL DEFAULT 0,
    "drawingScore" REAL NOT NULL DEFAULT 0,
    "guessedScore" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Alias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    CONSTRAINT "Alias_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sketch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drawing" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "guessCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Sketch_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Sketch_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sketchId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    CONSTRAINT "Guess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Guess_sketchId_fkey" FOREIGN KEY ("sketchId") REFERENCES "Sketch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Alias_text_key" ON "Alias"("text");
