/*
  Warnings:

  - Added the required column `codeRole` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roles` ADD COLUMN `codeRole` VARCHAR(191) NOT NULL;
