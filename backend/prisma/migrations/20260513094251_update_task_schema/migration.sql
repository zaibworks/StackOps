/*
  Warnings:

  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('todo', 'inprogress', 'done');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedToId" INTEGER,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
