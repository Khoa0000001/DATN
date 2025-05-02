/*
  Warnings:

  - You are about to alter the column `embedding` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `embedding` JSON NULL;
