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
-- Table structure for table `tbl_land_payment_process`
--

DROP TABLE IF EXISTS `tbl_land_payment_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_payment_process` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `land_area_id` bigint(20) NOT NULL,
  `payment_time` tinyint(4) NOT NULL,
  `amount_of_money` double NOT NULL,
  `amount_of_debt` double NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_payment_process`
--

LOCK TABLES `tbl_land_payment_process` WRITE;
/*!40000 ALTER TABLE `tbl_land_payment_process` DISABLE KEYS */;
INSERT INTO `tbl_land_payment_process` VALUES (1,2,2,0,0,2,'done',13,13,'2023-11-03 07:30:42','2023-11-03 07:45:34'),(2,2,2,0,0,2,'',13,13,'2023-11-03 07:31:14','2023-11-03 07:31:14'),(3,2,2,0,0,2,'',13,13,'2023-11-03 07:58:29','2023-11-03 07:58:29');
/*!40000 ALTER TABLE `tbl_land_payment_process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:07:39
