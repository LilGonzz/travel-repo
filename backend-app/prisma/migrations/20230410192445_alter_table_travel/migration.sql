/*
  Warnings:

  - You are about to alter the column `traveling_time` on the `travels` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_travels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "traveling_time" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "travels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_travels" ("created_at", "id", "isActive", "traveling_time", "update_at", "user_id") SELECT "created_at", "id", "isActive", "traveling_time", "update_at", "user_id" FROM "travels";
DROP TABLE "travels";
ALTER TABLE "new_travels" RENAME TO "travels";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
