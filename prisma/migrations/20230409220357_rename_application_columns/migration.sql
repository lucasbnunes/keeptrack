/*
  Warnings:

  - The values [not_applied,waiting,accepted,refused] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `position` on the `Application` table. All the data in the column will be lost.
  - Added the required column `applicationDate` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('applied', 'offer_received', 'offer_refused', 'not_selected', 'hired');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'applied';
COMMIT;

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "position",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'applied';
