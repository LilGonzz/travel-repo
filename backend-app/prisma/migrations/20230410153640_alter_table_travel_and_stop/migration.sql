/*
  Warnings:

  - You are about to drop the column `destiny` on the `travels` table. All the data in the column will be lost.
  - You are about to drop the column `start_point` on the `travels` table. All the data in the column will be lost.
  - Added the required column `position` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stop_point" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "travel_id" INTEGER NOT NULL,
    CONSTRAINT "stops_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "travels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stops" ("created_at", "id", "stop_point", "travel_id", "update_at") SELECT "created_at", "id", "stop_point", "travel_id", "update_at" FROM "stops";
DROP TABLE "stops";
ALTER TABLE "new_stops" RENAME TO "stops";
CREATE TABLE "new_travels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "traveling_time" DATETIME NOT NULL,
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
