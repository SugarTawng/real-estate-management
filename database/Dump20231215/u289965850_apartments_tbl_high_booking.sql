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
-- Table structure for table `tbl_high_booking`
--

DROP TABLE IF EXISTS `tbl_high_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `tbl_high_bookingcol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_highbooking_higharea_idx` (`high_area_id`),
  KEY `fk_highbooking_profile1_idx` (`sale_id`),
  KEY `fk_highbooking_profile2_idx` (`buyer_id`),
  CONSTRAINT `fk_highbooking_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_profile1` FOREIGN KEY (`sale_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_profile2` FOREIGN KEY (`buyer_id`) REFERENCES `tbl_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_booking`
--

LOCK TABLES `tbl_high_booking` WRITE;
/*!40000 ALTER TABLE `tbl_high_booking` DISABLE KEYS */;
INSERT INTO `tbl_high_booking` VALUES (1,2,40,0,2,2,'',13,13,'2023-11-03 08:31:39','2023-11-03 08:31:39',''),(2,2,40,0,2,2,'cancelled',13,13,'2023-11-03 08:47:08','2023-11-03 09:01:56',''),(3,NULL,39,0,2,2,'',13,13,'2023-11-03 09:19:28','2023-11-03 09:19:28','');
/*!40000 ALTER TABLE `tbl_high_booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:06:43
