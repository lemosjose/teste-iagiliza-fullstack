/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MessageRole" ADD VALUE 'SYSTEM';

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId",
ADD COLUMN     "chatId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Chat" (
    "id" UUID NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chat_userId_idx" ON "Chat"("userId");

-- CreateIndex
CREATE INDEX "Message_chatId_idx" ON "Message"("chatId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
