/*
  Warnings:

  - You are about to drop the column `stop_point` on the `stops` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `stops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "travel_id" INTEGER NOT NULL,
    CONSTRAINT "stops_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "travels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stops" ("created_at", "id", "position", "travel_id", "update_at") SELECT "created_at", "id", "position", "travel_id", "update_at" FROM "stops";
DROP TABLE "stops";
ALTER TABLE "new_stops" RENAME TO "stops";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
