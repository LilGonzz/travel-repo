/*
  Warnings:

  - You are about to drop the column `traveling_time` on the `travels` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_travels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distanceTime" REAL,
    "isActive" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "travels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_travels" ("created_at", "id", "isActive", "update_at", "user_id") SELECT "created_at", "id", "isActive", "update_at", "user_id" FROM "travels";
DROP TABLE "travels";
ALTER TABLE "new_travels" RENAME TO "travels";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
