/*
  Warnings:

  - You are about to drop the column `shippingInfo` on the `orders` table. All the data in the column will be lost.
  - Added the required column `address` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneCustomer` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `shippingInfo`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameCustomer` VARCHAR(191) NULL,
    ADD COLUMN `phoneCustomer` VARCHAR(191) NOT NULL,
    ADD COLUMN `timeOfReceipt` VARCHAR(191) NULL;
