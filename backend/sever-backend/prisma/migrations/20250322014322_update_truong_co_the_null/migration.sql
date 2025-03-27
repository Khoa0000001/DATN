/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `importdetails` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `importinvoices` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `logs` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `permissions` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `shippingmethods` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `suppliers` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `profilePicture` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_password_key` ON `Users`(`password`);
