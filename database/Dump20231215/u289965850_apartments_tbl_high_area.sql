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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:07:27
