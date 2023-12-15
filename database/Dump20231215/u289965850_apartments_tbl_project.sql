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
  `status` enum('working','done') NOT NULL DEFAULT 'working',
  `budget` bigint(20) NOT NULL DEFAULT 1000,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_project`
--

LOCK TABLES `tbl_project` WRITE;
/*!40000 ALTER TABLE `tbl_project` DISABLE KEYS */;
INSERT INTO `tbl_project` VALUES (1,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 07:59:23','true',20,NULL,'2023-08-05 07:59:23',13,13,'2023-08-05 07:59:23','2023-08-05 07:59:23','true','working',1000),(12,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:29:28','true',20,NULL,'2023-08-05 08:29:28',13,13,'2023-08-05 08:29:28','2023-08-05 08:29:28','true','working',1000),(13,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:30:22','true',20,NULL,'2023-08-05 08:30:22',13,13,'2023-08-05 08:30:22','2023-08-05 08:30:22','true','working',1000),(15,'abcd','abcd','098765443321','abc@gmail.com','2023-08-05 08:31:23','true',21,NULL,'2023-08-05 08:31:23',13,13,'2023-08-05 08:31:23','2023-08-16 10:46:07','true','working',1000),(17,'abcd','abcd','098765443321','abc@gmail.com','2023-11-24 04:19:07','true',20,NULL,'2023-11-24 04:19:07',13,13,'2023-11-24 04:19:07','2023-11-24 04:19:07','false','working',1000),(18,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 05:55:59','true',20,NULL,'2023-12-15 05:55:59',13,13,'2023-12-15 05:55:59','2023-12-15 05:55:59','false','working',1000),(19,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 05:56:04','true',20,NULL,'2023-12-15 05:56:04',13,13,'2023-12-15 05:56:04','2023-12-15 05:56:04','false','working',1000),(20,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 05:56:05','true',20,NULL,'2023-12-15 05:56:05',13,13,'2023-12-15 05:56:05','2023-12-15 05:56:05','false','working',1000),(21,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 06:02:53','true',20,NULL,'2023-12-15 06:02:53',13,13,'2023-12-15 06:02:53','2023-12-15 06:02:53','false','working',1000),(22,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 06:03:36','true',20,NULL,'2023-12-15 06:03:36',13,13,'2023-12-15 06:03:36','2023-12-15 06:03:36','false','working',1000),(23,'abcd','abcd','098765443321','abc@gmail.com','2023-12-15 06:06:36','true',20,NULL,'2023-12-15 06:06:36',13,13,'2023-12-15 06:06:36','2023-12-15 06:06:36','false','working',1000);
/*!40000 ALTER TABLE `tbl_project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:07:45
