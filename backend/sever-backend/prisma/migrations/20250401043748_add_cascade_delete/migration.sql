-- DropForeignKey
ALTER TABLE `attributes` DROP FOREIGN KEY `Attributes_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `attributevalues` DROP FOREIGN KEY `AttributeValues_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermissions` DROP FOREIGN KEY `RolePermissions_permissionId_fkey`;

-- DropIndex
DROP INDEX `RolePermissions_permissionId_fkey` ON `rolepermissions`;

-- AddForeignKey
ALTER TABLE `RolePermissions` ADD CONSTRAINT `RolePermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attributes` ADD CONSTRAINT `Attributes_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeValues` ADD CONSTRAINT `AttributeValues_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attributes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
