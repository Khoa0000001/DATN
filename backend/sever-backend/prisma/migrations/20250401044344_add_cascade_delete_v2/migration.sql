-- DropForeignKey
ALTER TABLE `attributevalues` DROP FOREIGN KEY `AttributeValues_productId_fkey`;

-- AddForeignKey
ALTER TABLE `AttributeValues` ADD CONSTRAINT `AttributeValues_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
