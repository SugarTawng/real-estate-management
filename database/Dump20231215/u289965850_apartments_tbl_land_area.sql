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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:06:49
