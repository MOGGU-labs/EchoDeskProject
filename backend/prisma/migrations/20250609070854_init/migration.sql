-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(100) NULL,
    `role` ENUM('superadmin', 'admin', 'moderator', 'user') NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientCode` VARCHAR(20) NULL,
    `name` VARCHAR(100) NOT NULL,
    `business` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `npwp` VARCHAR(45) NULL,
    `nkp` VARCHAR(45) NULL,
    `notes` TEXT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,

    UNIQUE INDEX `Client_clientCode_key`(`clientCode`),
    INDEX `Client_createdById_idx`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultFolder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `folderCode` VARCHAR(20) NULL,
    `clientId` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,

    UNIQUE INDEX `ConsultFolder_folderCode_key`(`folderCode`),
    INDEX `ConsultFolder_clientId_idx`(`clientId`),
    INDEX `ConsultFolder_createdById_idx`(`createdById`),
    UNIQUE INDEX `ConsultFolder_clientId_title_key`(`clientId`, `title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultCode` VARCHAR(20) NULL,
    `folderId` INTEGER NOT NULL,
    `aim` VARCHAR(255) NULL,
    `notes` TEXT NOT NULL,
    `result` TEXT NULL,
    `consultDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,

    UNIQUE INDEX `Consult_consultCode_key`(`consultCode`),
    INDEX `Consult_folderId_idx`(`folderId`),
    INDEX `Consult_consultDate_idx`(`consultDate`),
    INDEX `Consult_createdById_idx`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultFolder` ADD CONSTRAINT `ConsultFolder_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultFolder` ADD CONSTRAINT `ConsultFolder_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consult` ADD CONSTRAINT `Consult_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consult` ADD CONSTRAINT `Consult_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `ConsultFolder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
