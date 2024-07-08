-- --------------------------------------------------------
-- ホスト:                          127.0.0.1
-- サーバーのバージョン:                   8.0.34 - MySQL Community Server - GPL
-- サーバー OS:                      Win64
-- HeidiSQL バージョン:               12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- lms のデータベース構造をダンプしています
CREATE DATABASE IF NOT EXISTS `lms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lms`;

--  テーブル lms.attachment の構造をダンプしています
CREATE TABLE IF NOT EXISTS `attachment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Attachment_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.attachment: ~2 rows (約) のデータをダンプしています
INSERT INTO `attachment` (`id`, `name`, `url`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('75343740-f65b-4c56-8e0c-5d36cf1c9328', '35ca6dd1-f770-41ff-b3e9-fcfa9288fafd-gcfvu2.jpg', 'https://utfs.io/f/35ca6dd1-f770-41ff-b3e9-fcfa9288fafd-gcfvu2.jpg', '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:06:14.261', '2024-07-08 10:06:14.261'),
	('f99805c5-52fd-45d5-b3ed-0747b5457fed', '52df782a-f8ce-4b9e-bca8-39366579a358-gcfvu2.jpg', 'https://utfs.io/f/52df782a-f8ce-4b9e-bca8-39366579a358-gcfvu2.jpg', '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:05:57.617', '2024-07-08 10:05:57.617');

--  テーブル lms.category の構造をダンプしています
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.category: ~7 rows (約) のデータをダンプしています
INSERT INTO `category` (`id`, `name`) VALUES
	('45a45189-564a-4b7c-8568-cb97f2109963', 'Fitness'),
	('af5ceff4-a5bc-4afd-ad1c-f0dbf710b618', 'Accounting'),
	('b39c03de-4e95-4608-b422-d71e26231b03', 'Filming'),
	('b71a16e3-59bb-4c1b-860d-216bec8e58a4', 'Engineering'),
	('b7f405a7-8ff9-406b-8c9b-94d15f9aec8c', 'Photography'),
	('cdcef534-d7f9-40c7-ae36-459e077a6ff8', 'Computer Science'),
	('e3177765-5fb2-4539-9707-f54cdd6e1e47', 'Music');

--  テーブル lms.chapter の構造をダンプしています
CREATE TABLE IF NOT EXISTS `chapter` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `videoUrl` text COLLATE utf8mb4_unicode_ci,
  `position` int NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isFree` tinyint(1) NOT NULL DEFAULT '0',
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chapter_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.chapter: ~4 rows (約) のデータをダンプしています
INSERT INTO `chapter` (`id`, `title`, `description`, `videoUrl`, `position`, `isPublished`, `isFree`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('4468075d-d4a2-4d10-a5b5-c3007f3828e3', 'chapter1', '<p>aaaa</p>', 'https://utfs.io/f/51e07b19-491d-4741-a9af-1630bd49f434-p121dy.mp4', 1, 1, 1, '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:05:12.844', '2024-07-08 10:07:09.537'),
	('997e87be-2cb0-4ca9-a633-52fb07a1101f', 'chapter4', '<p>adsc</p>', 'https://utfs.io/f/543f48d4-8906-4d99-a9fc-039db955752e-n08s5s.mp4', 4, 1, 0, '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:05:29.200', '2024-07-08 10:19:32.986'),
	('a4459ba3-db22-4bfb-aee4-69f53204a478', 'chapter2', '<p>bbbcdxdd</p>', 'https://utfs.io/f/80a2eb0e-dff8-4e4d-ba4e-ad3af1068afa-p121dy.mp4', 2, 1, 0, '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:05:20.164', '2024-07-08 10:15:07.926'),
	('dcea1bee-0eef-4350-a5f0-83c658910af2', 'chapter3', '<p>chapter3</p>', 'https://utfs.io/f/33fb8a57-0304-4f2e-ae71-2bcc4ed943ed-p121dy.mp4', 3, 1, 0, '02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', '2024-07-08 10:05:24.096', '2024-07-08 10:18:10.927');

--  テーブル lms.course の構造をダンプしています
CREATE TABLE IF NOT EXISTS `course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` text COLLATE utf8mb4_unicode_ci,
  `price` double DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_categoryId_idx` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.course: ~1 rows (約) のデータをダンプしています
INSERT INTO `course` (`id`, `userId`, `title`, `description`, `imageUrl`, `price`, `isPublished`, `categoryId`, `createdAt`, `updatedAt`) VALUES
	('02b4c8f5-ce3c-40f5-b9d3-c4ff6ee32bfe', 'user_2eZxMqZH3320VoykvpabZ8dpT6f', 'course1', 'first course', 'https://utfs.io/f/d5841a62-8137-4b59-a6d5-8746625b09dc-4o63ls.jpg', 123456, 1, 'b71a16e3-59bb-4c1b-860d-216bec8e58a4', '2024-07-08 10:03:58.027', '2024-07-08 10:07:16.443');

--  テーブル lms.muxdata の構造をダンプしています
CREATE TABLE IF NOT EXISTS `muxdata` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assetId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playbackId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chapterId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MuxData_chapterId_key` (`chapterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.muxdata: ~4 rows (約) のデータをダンプしています
INSERT INTO `muxdata` (`id`, `assetId`, `playbackId`, `chapterId`) VALUES
	('7048783a-8994-4601-9dfb-70aed7b45de1', 'AKdD33r5Q8lX02hsuENkqkxBniXfDKDQRzOyKLxIefgQ', '3L8vUWcvLNnSCo39dq013JoP1XjOgMvTxSNBAKMDVmbs', '4468075d-d4a2-4d10-a5b5-c3007f3828e3'),
	('926df3ef-5394-4574-9bb1-451b4f3635c7', '3twjGJgyPmPFbThlPyDYEhq00J3MYwIQ02hYT4bUwnIuY', 'gSAH2X9901p01W004mbN6bxKPxLKa9oXbRa4NuvHvY1xO00', '997e87be-2cb0-4ca9-a633-52fb07a1101f'),
	('b30d8714-cd24-4910-96cc-483be56af93e', 'vcdX7gqsYuUBEHIgxeVHgkeSsTFxr5OAFwzxlU7zZv00', 'SCDz6SHGvRSNh1vyuk5Z4tQXejAoRh6Rr69SSaFGnaw', 'a4459ba3-db22-4bfb-aee4-69f53204a478'),
	('c4656d0e-0739-4444-9869-c3a000281ad7', '5lAOYe9ghnvobvRyEzvCPEdR026kCoBcQ6VCaMJvMezY', 'ijM6Jsqg789cBl6bG5q027TmvIBt1eR6028vi016fhf1qI', 'dcea1bee-0eef-4350-a5f0-83c658910af2');

--  テーブル lms.purchase の構造をダンプしています
CREATE TABLE IF NOT EXISTS `purchase` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Purchase_userId_courseId_key` (`userId`,`courseId`),
  KEY `Purchase_courseId_idx` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.purchase: ~0 rows (約) のデータをダンプしています

--  テーブル lms.stripecustomer の構造をダンプしています
CREATE TABLE IF NOT EXISTS `stripecustomer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripeCustomerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StripeCustomer_userId_key` (`userId`),
  UNIQUE KEY `StripeCustomer_stripeCustomerId_key` (`stripeCustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.stripecustomer: ~0 rows (約) のデータをダンプしています

--  テーブル lms.userprogress の構造をダンプしています
CREATE TABLE IF NOT EXISTS `userprogress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapterId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserProgress_userId_chapterId_key` (`userId`,`chapterId`),
  KEY `UserProgress_chapterId_idx` (`chapterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms.userprogress: ~0 rows (約) のデータをダンプしています

--  テーブル lms._prisma_migrations の構造をダンプしています
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- テーブル lms._prisma_migrations: ~1 rows (約) のデータをダンプしています
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('538e637c-dbba-42ca-a386-668c1af45c95', '4eaa619e1a7438721055d95fb0a0c96a38a9ea7d4a04b48326edd685b0b33247', '2024-07-08 09:58:52.672', '20240708095852_', NULL, NULL, '2024-07-08 09:58:52.312', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
