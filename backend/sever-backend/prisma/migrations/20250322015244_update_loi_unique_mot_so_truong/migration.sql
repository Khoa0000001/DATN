/*
  Warnings:

  - Made the column `description` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `suppliers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `suppliers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `suppliers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Users_password_key` ON `users`;

-- AlterTable
ALTER TABLE `attributes` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `logs` MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paymentmethods` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;
