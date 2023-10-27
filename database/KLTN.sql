-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 217.21.74.51    Database: u289965850_apartments
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.19-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_account`
--

DROP TABLE IF EXISTS `tbl_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_account` (
  `id` bigint(20) NOT NULL,
  `social_id` varchar(256) DEFAULT NULL,
  `phone` varchar(12) NOT NULL,
  `login_name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `display_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `language` char(2) DEFAULT NULL,
  `type` enum('anonymous','admin','super_admin','normal_user') NOT NULL,
  `employee` binary(1) DEFAULT NULL,
  `phone_verified` varchar(12) NOT NULL,
  `email_verified` varchar(64) NOT NULL,
  `social_verified` varchar(256) DEFAULT NULL,
  `activated` enum('true','false') NOT NULL DEFAULT 'false',
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_account`
--

LOCK TABLES `tbl_account` WRITE;
/*!40000 ALTER TABLE `tbl_account` DISABLE KEYS */;
INSERT INTO `tbl_account` VALUES (13,'https://www.facebook.com/SugarTawng','0385132042','sadmin','$2a$10$944koTAEKOIddbXmOVXPV.BrkuGWmfT9fc.ySAlf.SKSoSmVlFzBi','user2','Sugar','Sugar Tawng','tangvietdien0707@gmail.com','vi','super_admin',NULL,'0385353783','20521185@gm.uit.edu.vn','https://www.facebook.com/chuot.xa.589','true','false',1,1,'0000-00-00 00:00:00','2023-08-13 07:41:04'),(14,NULL,'0123456789','user1','$2a$10$SDx/h.ipqy0L/kypZgjMXOuxvuX40r22iaaSa1Wcfk9K13LkdPUK.','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:10:35','2023-08-05 05:10:35'),(15,NULL,'0123456789','user1','$2a$10$W7t8CzGRwFHNnBYaRYanSePZq7SWVOA1NSSAbPnV/vHqnRLNPZTcW','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:12:26','2023-08-05 05:12:26'),(16,NULL,'0123456789','user1','$2a$10$B5I9M7mMOYyqViwKkHkzDO5Nips0lbQvqtncakkXi5RAAl0Ud48jG','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:12:56','2023-08-05 05:12:56'),(19,NULL,'0123456789','user1','$2a$10$EKT4/C1R.IW.S/mwvXWquuk/NAqyVpaCw4m8AWqNC2PpNSjg7Ka/m','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','true',13,13,'2023-08-11 07:58:01','2023-08-11 07:58:01'),(20,NULL,'0123456789','user1','$2a$10$5hei6j/1Ha5IAlUtExQZYey/liAhvWUUmmt3AYmHi95yZ3AJ3/jXO','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','true',13,13,'2023-08-11 08:02:25','2023-08-11 08:02:25');
/*!40000 ALTER TABLE `tbl_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_block`
--

DROP TABLE IF EXISTS `tbl_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_block` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `zone_id` bigint(20) NOT NULL,
  `number_of_floor` int(11) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `is_service` tinyint(1) NOT NULL DEFAULT 0,
  `desc` varchar(256) DEFAULT NULL,
  `type` enum('normal','luxury') NOT NULL,
  `progress` int(11) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  KEY `fk_block_zone_idx` (`zone_id`),
  CONSTRAINT `fk_block_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_block`
--

LOCK TABLES `tbl_block` WRITE;
/*!40000 ALTER TABLE `tbl_block` DISABLE KEYS */;
INSERT INTO `tbl_block` VALUES (2,3,1,90,180,0,'a','normal',1,'2023-08-08 12:19:31',13,13,'2023-08-08 12:19:31','2023-08-08 12:19:31','false'),(3,3,1,90,180,0,'a','normal',1,'2023-08-11 08:08:56',13,13,'2023-08-11 08:08:56','2023-08-11 08:08:56','false'),(4,3,2,90,180,0,'a','normal',1,'2023-08-11 08:14:11',13,13,'2023-08-11 08:14:11','2023-08-14 10:41:42','false');
/*!40000 ALTER TABLE `tbl_block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_floor`
--

DROP TABLE IF EXISTS `tbl_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_floor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `block_id` bigint(20) NOT NULL,
  `number_of_high_area` int(11) NOT NULL,
  `public_area` float NOT NULL,
  `total_area` float NOT NULL,
  `progress` tinyint(4) DEFAULT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_floor_block_idx` (`block_id`),
  CONSTRAINT `fk_floor_block` FOREIGN KEY (`block_id`) REFERENCES `tbl_block` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_floor`
--

LOCK TABLES `tbl_floor` WRITE;
/*!40000 ALTER TABLE `tbl_floor` DISABLE KEYS */;
INSERT INTO `tbl_floor` VALUES (2,2,1,1,1,1,'the first',13,13,'2023-08-08 16:56:23','2023-08-08 16:56:23',''),(3,2,3,1,1,1,'the first',13,13,'2023-08-08 17:00:19','2023-08-14 11:00:06','');
/*!40000 ALTER TABLE `tbl_floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_high_area`
--

DROP TABLE IF EXISTS `tbl_high_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_area` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `floor_id` bigint(20) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `high_area_direction` varchar(256) NOT NULL,
  `total_area` float NOT NULL,
  `progress` tinyint(4) DEFAULT NULL,
  `number_of_wc` int(11) NOT NULL,
  `number_of_room` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `owner` bigint(20) DEFAULT NULL,
  `buy_status` enum('block','deal','not block') NOT NULL DEFAULT 'not block',
  `desc` varchar(256) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_higharea_floor_idx` (`floor_id`),
  CONSTRAINT `fk_higharea_floor` FOREIGN KEY (`floor_id`) REFERENCES `tbl_floor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_area`
--

LOCK TABLES `tbl_high_area` WRITE;
/*!40000 ALTER TABLE `tbl_high_area` DISABLE KEYS */;
INSERT INTO `tbl_high_area` VALUES (2,2,-1,-180,'a',1,100,0,0,0,13,'not block',NULL,13,13,'2023-08-09 06:02:28','2023-08-09 06:02:28','true');
/*!40000 ALTER TABLE `tbl_high_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_high_booking`
--

DROP TABLE IF EXISTS `tbl_high_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_booking` (
  `id` bigint(20) NOT NULL,
  `high_area_id` bigint(20) DEFAULT NULL,
  `zone_id` bigint(20) NOT NULL,
  `booking_fee` float NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `buyer_id` bigint(20) NOT NULL,
  `status` enum('enable','disable','cancelled') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_highbooking_higharea_idx` (`high_area_id`),
  KEY `fk_highbooking_profile1_idx` (`sale_id`),
  KEY `fk_highbooking_profile2_idx` (`buyer_id`),
  CONSTRAINT `fk_highbooking_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_profile1` FOREIGN KEY (`sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_profile2` FOREIGN KEY (`buyer_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_zone` FOREIGN KEY (`id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_booking`
--

LOCK TABLES `tbl_high_booking` WRITE;
/*!40000 ALTER TABLE `tbl_high_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_high_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_high_list_owner`
--

DROP TABLE IF EXISTS `tbl_high_list_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_list_owner` (
  `owner_id` bigint(20) NOT NULL,
  `high_area_id` bigint(20) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `owned_at` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`owner_id`,`high_area_id`),
  KEY `fk_highlistowner_higharea_idx` (`high_area_id`),
  CONSTRAINT `fk_highlistowner_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highlistowner_profile` FOREIGN KEY (`owner_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_list_owner`
--

LOCK TABLES `tbl_high_list_owner` WRITE;
/*!40000 ALTER TABLE `tbl_high_list_owner` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_high_list_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_high_payment_process`
--

DROP TABLE IF EXISTS `tbl_high_payment_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_payment_process` (
  `id` bigint(20) NOT NULL,
  `high_area_id` bigint(20) NOT NULL,
  `payment_time` tinyint(4) NOT NULL,
  `amount_of_money` double NOT NULL,
  `number_of_debt` double NOT NULL,
  `submitter` bigint(20) NOT NULL,
  `status` enum('indebted','done') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_highpaymentprocess_higharea_idx` (`high_area_id`),
  KEY `fk_highpaymentprocess_profile_idx` (`submitter`),
  CONSTRAINT `fk_highpaymentprocess_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highpaymentprocess_profile` FOREIGN KEY (`submitter`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_payment_process`
--

LOCK TABLES `tbl_high_payment_process` WRITE;
/*!40000 ALTER TABLE `tbl_high_payment_process` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_high_payment_process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_high_sale_list`
--

DROP TABLE IF EXISTS `tbl_high_sale_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_sale_list` (
  `id` bigint(20) NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `manager_sale_id` bigint(20) NOT NULL,
  `high_area_id` bigint(20) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `status` enum('enable','disable') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_highsalelist_higharea_idx` (`high_area_id`),
  KEY `fk_highsalelist_profile1_idx` (`sale_id`),
  KEY `fk_highsalelist_profile2_idx` (`manager_sale_id`),
  CONSTRAINT `fk_highsalelist_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highsalelist_profile1` FOREIGN KEY (`sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highsalelist_profile2` FOREIGN KEY (`manager_sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_sale_list`
--

LOCK TABLES `tbl_high_sale_list` WRITE;
/*!40000 ALTER TABLE `tbl_high_sale_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_high_sale_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_area`
--

DROP TABLE IF EXISTS `tbl_land_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_area` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `zone_id` bigint(20) NOT NULL,
  `land_direction` varchar(256) NOT NULL,
  `is_front` varchar(5) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `building_area` float NOT NULL,
  `total_area` float NOT NULL,
  `progress` tinyint(4) DEFAULT NULL,
  `number_of_room` int(11) NOT NULL,
  `number_of_floor` int(11) NOT NULL,
  `number_of_wc` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `owner` bigint(20) DEFAULT NULL,
  `buy_status` enum('block','deal','not block') NOT NULL DEFAULT 'not block',
  `desc` varchar(256) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_landarea_zone_idx` (`zone_id`),
  CONSTRAINT `fk_landarea_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_area`
--

LOCK TABLES `tbl_land_area` WRITE;
/*!40000 ALTER TABLE `tbl_land_area` DISABLE KEYS */;
INSERT INTO `tbl_land_area` VALUES (1,3,'a','false',0,0,0,1,0,0,0,0,0,13,'not block',NULL,'0000-00-00 00:00:00',13,13,'2023-08-09 08:03:51','2023-08-09 08:03:51','true'),(2,3,'b','false',0,0,0,1,0,0,0,0,0,13,'not block',NULL,'0000-00-00 00:00:00',13,13,'2023-08-11 10:34:53','2023-08-15 16:38:17','false');
/*!40000 ALTER TABLE `tbl_land_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_booking`
--

DROP TABLE IF EXISTS `tbl_land_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_booking` (
  `id` bigint(20) NOT NULL,
  `land_area_id` bigint(20) DEFAULT NULL,
  `zone_id` bigint(20) NOT NULL,
  `bookingFee` float NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `buyer_id` bigint(20) NOT NULL,
  `status` enum('enable','disable','cancelled') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_landbooking_landarea_idx` (`land_area_id`),
  KEY `fk_landbooking_profile_idx` (`sale_id`),
  KEY `fk_landbooking_profile2_idx` (`buyer_id`),
  KEY `fk_landbooking_zone_idx` (`zone_id`),
  CONSTRAINT `fk_landbooking_landarea` FOREIGN KEY (`land_area_id`) REFERENCES `tbl_land_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_profile1` FOREIGN KEY (`sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_profile2` FOREIGN KEY (`buyer_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_booking`
--

LOCK TABLES `tbl_land_booking` WRITE;
/*!40000 ALTER TABLE `tbl_land_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_land_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_list_onwer`
--

DROP TABLE IF EXISTS `tbl_land_list_onwer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_list_onwer` (
  `owner_id` bigint(20) NOT NULL,
  `land_area_id` bigint(20) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `owned_at` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`owner_id`,`land_area_id`),
  KEY `fk_landlistowner_landarea_idx` (`land_area_id`),
  CONSTRAINT `fk_landlistowner_landarea` FOREIGN KEY (`land_area_id`) REFERENCES `tbl_land_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landlistowner_profile` FOREIGN KEY (`owner_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_list_onwer`
--

LOCK TABLES `tbl_land_list_onwer` WRITE;
/*!40000 ALTER TABLE `tbl_land_list_onwer` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_land_list_onwer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_payment_process`
--

DROP TABLE IF EXISTS `tbl_land_payment_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_payment_process` (
  `id` bigint(20) NOT NULL,
  `land_area_id` bigint(20) NOT NULL,
  `payment_time` tinyint(4) NOT NULL,
  `amount_of_money` double NOT NULL,
  `number_of_debt` double NOT NULL,
  `submitter` bigint(20) NOT NULL,
  `status` enum('indebted','done') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_landpaymentprocess_landarea_idx` (`land_area_id`),
  KEY `fk_landpaymentprocess_profile_idx` (`submitter`),
  CONSTRAINT `fk_landpaymentprocess_landarea` FOREIGN KEY (`land_area_id`) REFERENCES `tbl_land_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landpaymentprocess_profile` FOREIGN KEY (`submitter`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_payment_process`
--

LOCK TABLES `tbl_land_payment_process` WRITE;
/*!40000 ALTER TABLE `tbl_land_payment_process` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_land_payment_process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_sale_list`
--

DROP TABLE IF EXISTS `tbl_land_sale_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_sale_list` (
  `id` bigint(20) NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `manager_sale_id` bigint(20) NOT NULL,
  `land_area_id` bigint(20) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `status` enum('enable','disable') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_landsalelist_landarea_idx` (`land_area_id`),
  KEY `fk_landsalelist_profile1_idx` (`sale_id`),
  KEY `fk_landsalelist_profile2_idx` (`manager_sale_id`),
  CONSTRAINT `fk_landsalelist_landarea` FOREIGN KEY (`land_area_id`) REFERENCES `tbl_land_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landsalelist_profile1` FOREIGN KEY (`sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landsalelist_profile2` FOREIGN KEY (`manager_sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_sale_list`
--

LOCK TABLES `tbl_land_sale_list` WRITE;
/*!40000 ALTER TABLE `tbl_land_sale_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_land_sale_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `content` varchar(4068) NOT NULL,
  `keyword` varchar(256) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_message_account_createdby_idx` (`created_by`),
  KEY `fk_message_account_updatedby_idx` (`updated_by`),
  CONSTRAINT `fk_message_account_createdby` FOREIGN KEY (`created_by`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `fk_message_account_updatedby` FOREIGN KEY (`updated_by`) REFERENCES `tbl_account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
INSERT INTO `tbl_message` VALUES (1,'a','a','a',13,13,'2023-08-09 08:39:49','2023-08-09 08:39:49','true'),(2,'b','b','a',13,13,'2023-08-11 11:06:58','2023-08-15 17:21:08','false');
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_payment_method`
--

DROP TABLE IF EXISTS `tbl_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_payment_method` (
  `id` bigint(20) NOT NULL,
  `zone_id` bigint(20) NOT NULL,
  `total_of_pay_time` tinyint(4) NOT NULL DEFAULT 127,
  `method_name` varchar(256) NOT NULL,
  `percent_discount` float NOT NULL,
  `vat` float DEFAULT NULL,
  `maintenance_fee` float DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_paymentmethod_zone_idx` (`zone_id`),
  CONSTRAINT `fk_paymentmethod_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment_method`
--

LOCK TABLES `tbl_payment_method` WRITE;
/*!40000 ALTER TABLE `tbl_payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_payment_method_process`
--

DROP TABLE IF EXISTS `tbl_payment_method_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_payment_method_process` (
  `id` bigint(20) NOT NULL,
  `payment_method_id` bigint(20) NOT NULL,
  `payment_time_example` tinyint(4) NOT NULL,
  `flag_time` int(11) NOT NULL,
  `include_vat` enum('true','false') NOT NULL,
  `total_percent_payment` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_paymentmethodprocess_paymentmethod_idx` (`payment_method_id`),
  CONSTRAINT `fk_paymentmethodprocess_paymentmethod` FOREIGN KEY (`payment_method_id`) REFERENCES `tbl_payment_method` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment_method_process`
--

LOCK TABLES `tbl_payment_method_process` WRITE;
/*!40000 ALTER TABLE `tbl_payment_method_process` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_payment_method_process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_profile`
--

DROP TABLE IF EXISTS `tbl_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `address` varchar(256) NOT NULL,
  `role_job` enum('sale','orthers') NOT NULL,
  `position_job` enum('manager','leader','staff') NOT NULL,
  `experience_year` int(11) NOT NULL,
  `previous_position` varchar(256) DEFAULT NULL,
  `working_time` int(11) NOT NULL,
  `salary` float NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profile_account_idx` (`account_id`),
  CONSTRAINT `fk_profile_account` FOREIGN KEY (`account_id`) REFERENCES `tbl_account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_profile`
--

LOCK TABLES `tbl_profile` WRITE;
/*!40000 ALTER TABLE `tbl_profile` DISABLE KEYS */;
INSERT INTO `tbl_profile` VALUES (2,13,'b','sale','staff',0,'a',1,0,13,13,'2023-08-10 04:23:18','2023-08-15 21:19:40','true'),(4,13,'','sale','staff',0,'a',1,0,13,13,'2023-08-11 11:40:32','2023-08-11 11:40:32','false');
/*!40000 ALTER TABLE `tbl_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_profile_project`
--

DROP TABLE IF EXISTS `tbl_profile_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_profile_project` (
  `project_id` bigint(20) NOT NULL,
  `profile_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`project_id`,`profile_id`),
  KEY `fk_profileandproject_profile_idx` (`profile_id`),
  CONSTRAINT `fk_profileandproject_profile` FOREIGN KEY (`profile_id`) REFERENCES `tbl_profile` (`id`),
  CONSTRAINT `fk_profileandproject_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_profile_project`
--

LOCK TABLES `tbl_profile_project` WRITE;
/*!40000 ALTER TABLE `tbl_profile_project` DISABLE KEYS */;
INSERT INTO `tbl_profile_project` VALUES (1,2,13,13,'2023-08-10 05:23:10','2023-08-10 05:23:10','true'),(15,4,13,13,'2023-08-11 11:41:00','2023-08-11 11:41:00','false');
/*!40000 ALTER TABLE `tbl_profile_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_project`
--

DROP TABLE IF EXISTS `tbl_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `address` varchar(256) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(64) NOT NULL,
  `open_at` datetime NOT NULL,
  `activated` enum('true','false') NOT NULL,
  `project_progress` tinyint(4) DEFAULT 0,
  `desc` varchar(256) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_project`
--

LOCK TABLES `tbl_project` WRITE;
/*!40000 ALTER TABLE `tbl_project` DISABLE KEYS */;
INSERT INTO `tbl_project` VALUES (1,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 07:59:23','true',20,NULL,'2023-08-05 07:59:23',13,13,'2023-08-05 07:59:23','2023-08-05 07:59:23','true'),(12,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:29:28','true',20,NULL,'2023-08-05 08:29:28',13,13,'2023-08-05 08:29:28','2023-08-05 08:29:28','true'),(13,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:30:22','true',20,NULL,'2023-08-05 08:30:22',13,13,'2023-08-05 08:30:22','2023-08-05 08:30:22','true'),(15,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:31:23','true',21,NULL,'2023-08-05 08:31:23',13,13,'2023-08-05 08:31:23','2023-08-16 10:46:07','true');
/*!40000 ALTER TABLE `tbl_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_whiteboard`
--

DROP TABLE IF EXISTS `tbl_whiteboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_whiteboard` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `content` varchar(4068) NOT NULL,
  `keyword` varchar(256) DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `project_id` bigint(20) NOT NULL,
  `priority` enum('high','normal','low') NOT NULL DEFAULT 'low',
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_whiteboard_project_idx` (`project_id`),
  CONSTRAINT `fk_whiteboard_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_whiteboard`
--

LOCK TABLES `tbl_whiteboard` WRITE;
/*!40000 ALTER TABLE `tbl_whiteboard` DISABLE KEYS */;
INSERT INTO `tbl_whiteboard` VALUES (2,'b','a','a',0,1,'low',13,13,'2023-08-09 10:25:43','2023-08-15 18:19:54','true');
/*!40000 ALTER TABLE `tbl_whiteboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_zone`
--

DROP TABLE IF EXISTS `tbl_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_zone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `construction_area` float NOT NULL,
  `total_area` float NOT NULL,
  `number_of_block` tinyint(4) NOT NULL,
  `number_of_unit_land` tinyint(4) NOT NULL,
  `progress` tinyint(4) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_zone_project_idx` (`project_id`),
  CONSTRAINT `fk_zone_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_zone`
--

LOCK TABLES `tbl_zone` WRITE;
/*!40000 ALTER TABLE `tbl_zone` DISABLE KEYS */;
INSERT INTO `tbl_zone` VALUES (3,1,'abc','',0,0,0,0,0,'2023-08-06 21:44:20',13,13,'2023-08-06 21:44:20','2023-08-06 21:44:20','true'),(36,1,'abc','',1,1,0,0,1,'2023-08-07 09:42:23',13,13,'2023-08-07 09:42:23','2023-08-07 09:42:23','true'),(37,1,'xyz','',1,1,0,0,1,'2023-08-07 09:42:54',13,13,'2023-08-07 09:42:54','2023-08-16 09:04:41','true');
/*!40000 ALTER TABLE `tbl_zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-27 17:41:25
