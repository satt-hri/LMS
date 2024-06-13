/*
 Navicat MySQL Data Transfer

 Source Server         : dev5p.in.satt.jp
 Source Server Type    : MySQL
 Source Server Version : 80023 (8.0.23)
 Source Host           : dev5p.in.satt.jp:3306
 Source Schema         : LMS

 Target Server Type    : MySQL
 Target Server Version : 80023 (8.0.23)
 File Encoding         : 65001

 Date: 13/06/2024 18:57:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Attachment
-- ----------------------------
DROP TABLE IF EXISTS `Attachment`;
CREATE TABLE `Attachment`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Attachment_courseId_idx`(`courseId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Attachment
-- ----------------------------
INSERT INTO `Attachment` VALUES ('02a62d53-9ea5-4ba7-81f1-3717544ffdcb', '9ff65430-cecb-49c2-8e69-2292e4911b2b-i7ebj.jpg', 'https://utfs.io/f/9ff65430-cecb-49c2-8e69-2292e4911b2b-i7ebj.jpg', '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-04-17 01:48:24.287', '2024-04-17 01:48:24.287');
INSERT INTO `Attachment` VALUES ('2db7f419-1002-464a-bfe7-1e45ea312d45', 'f159a2a4-a59f-4061-b978-cadea0e5b024-76cpux.jpg', 'https://utfs.io/f/f159a2a4-a59f-4061-b978-cadea0e5b024-76cpux.jpg', '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-04-17 01:48:08.043', '2024-04-17 01:48:08.043');

-- ----------------------------
-- Table structure for Category
-- ----------------------------
DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Category
-- ----------------------------
INSERT INTO `Category` VALUES ('07c43b90-fe80-4a82-bbfd-813526dc4d76', 'Fitness');
INSERT INTO `Category` VALUES ('22c59bf2-b1d6-4b0b-bc73-1fc0537d0ca7', 'Photography');
INSERT INTO `Category` VALUES ('295f4ef7-6271-43c8-a133-ef0556b3fea5', 'Accounting');
INSERT INTO `Category` VALUES ('43610b4e-7cad-4e34-93bc-5738e6fc6b56', 'Music');
INSERT INTO `Category` VALUES ('52ab9bc9-07fa-4530-a66e-c671e4386964', 'Computer Science');
INSERT INTO `Category` VALUES ('b472de0a-901d-42db-813a-56878fee2719', 'Engineering');
INSERT INTO `Category` VALUES ('e8d74fce-f7f4-4cfd-a76e-d91cbc298edd', 'Filming');

-- ----------------------------
-- Table structure for Chapter
-- ----------------------------
DROP TABLE IF EXISTS `Chapter`;
CREATE TABLE `Chapter`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `videoUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `position` int NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 0,
  `isFree` tinyint(1) NOT NULL DEFAULT 0,
  `courseId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Chapter_courseId_idx`(`courseId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Chapter
-- ----------------------------
INSERT INTO `Chapter` VALUES ('16e9966f-392b-4e3f-a3b4-51b08d4e5cc9', 'chapter3', NULL, NULL, 2, 0, 0, '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-06-11 05:53:54.091', '2024-06-11 09:12:29.220');
INSERT INTO `Chapter` VALUES ('55b133eb-2d1c-4606-a2b0-750559677b63', 'chapter2', NULL, NULL, 1, 0, 0, '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-06-11 00:34:32.751', '2024-06-11 09:10:33.550');
INSERT INTO `Chapter` VALUES ('71577265-745b-4df5-aa5d-f48dde3a76c5', 'chapter4', NULL, NULL, 0, 0, 0, '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-06-11 07:18:22.482', '2024-06-11 09:10:33.543');
INSERT INTO `Chapter` VALUES ('ebf2acbd-d732-4cd9-959d-069487021d12', 'chapter1', '<ol><li>vafdfad</li><li>dsfadfsad</li><li>4564</li></ol><p><br></p>', 'https://utfs.io/f/054f1ba7-ad79-4523-bae9-e5e2df5e53ba-paiafe.mp4', 3, 0, 0, '9c727b4f-e9bc-408a-b75c-e273c34787f3', '2024-04-17 10:28:11.621', '2024-06-13 09:54:42.275');

-- ----------------------------
-- Table structure for Course
-- ----------------------------
DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `imageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `price` double NULL DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 0,
  `categoryId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Course_categoryId_idx`(`categoryId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Course
-- ----------------------------
INSERT INTO `Course` VALUES ('9c727b4f-e9bc-408a-b75c-e273c34787f3', 'user_2eZxMqZH3320VoykvpabZ8dpT6f', '78945688', 'bac', 'https://utfs.io/f/ad3ed488-1421-425e-bd75-a42c8b3a15b0-3wb6es.jpg', 123456, 0, 'b472de0a-901d-42db-813a-56878fee2719', '2024-04-05 03:06:23.259', '2024-06-13 02:10:39.843');
INSERT INTO `Course` VALUES ('ad93407e-b494-4af5-bc31-b141dcd0dece', 'user_2eZxMqZH3320VoykvpabZ8dpT6f', 'test', NULL, NULL, NULL, 0, NULL, '2024-04-05 02:49:48.295', '2024-04-05 02:49:48.295');
INSERT INTO `Course` VALUES ('e428c4c4-7986-4194-8c38-b4aa964c5fac', 'user_2eZxMqZH3320VoykvpabZ8dpT6f', 'test1', NULL, NULL, NULL, 0, NULL, '2024-04-05 03:05:11.055', '2024-04-05 03:05:11.055');

-- ----------------------------
-- Table structure for MuxData
-- ----------------------------
DROP TABLE IF EXISTS `MuxData`;
CREATE TABLE `MuxData`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `assetId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `playbackId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `chapterId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `MuxData_chapterId_key`(`chapterId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of MuxData
-- ----------------------------
INSERT INTO `MuxData` VALUES ('3c5abc49-a73e-4505-aa3a-d50c2eadfde5', 'kUZxIUklN2x5Dh2fysNv1XrOJ02F01O1lgX7Rn7KA2o02c', 'lV3tzvuK8PRP8qPRLqP01tlgS400sFA71ti2je3L02Ul1A', 'ebf2acbd-d732-4cd9-959d-069487021d12');

-- ----------------------------
-- Table structure for Purchase
-- ----------------------------
DROP TABLE IF EXISTS `Purchase`;
CREATE TABLE `Purchase`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Purchase_courseId_idx`(`courseId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Purchase
-- ----------------------------

-- ----------------------------
-- Table structure for StripeCustomer
-- ----------------------------
DROP TABLE IF EXISTS `StripeCustomer`;
CREATE TABLE `StripeCustomer`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripeCustomerId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `StripeCustomer_userId_key`(`userId` ASC) USING BTREE,
  UNIQUE INDEX `StripeCustomer_stripeCustomerId_key`(`stripeCustomerId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of StripeCustomer
-- ----------------------------

-- ----------------------------
-- Table structure for UserProgress
-- ----------------------------
DROP TABLE IF EXISTS `UserProgress`;
CREATE TABLE `UserProgress`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapterId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isCompleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UserProgress_id_chapterId_key`(`id` ASC, `chapterId` ASC) USING BTREE,
  INDEX `UserProgress_chapterId_idx`(`chapterId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of UserProgress
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
