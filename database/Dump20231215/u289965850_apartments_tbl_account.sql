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
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_account`
--

LOCK TABLES `tbl_account` WRITE;
/*!40000 ALTER TABLE `tbl_account` DISABLE KEYS */;
INSERT INTO `tbl_account` VALUES (1,NULL,'0123456789','user1','$2a$10$nGwomoOt5/XSra5f6K0UgO4Dt1NBAyqDQmmdRvkmtiqUjW/slLYDK','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-12-15 06:33:24','2023-12-15 06:33:24'),(13,'https://www.facebook.com/SugarTawng','0385132042','sadmin','$2a$10$944koTAEKOIddbXmOVXPV.BrkuGWmfT9fc.ySAlf.SKSoSmVlFzBi','user2','Sugar','Sugar Tawng','tangvietdien0707@gmail.com','vi','super_admin',NULL,'0385353783','20521185@gm.uit.edu.vn','https://www.facebook.com/chuot.xa.589','true','false',1,1,'0000-00-00 00:00:00','2023-08-13 07:41:04'),(14,NULL,'0123456789','user1','$2a$10$SDx/h.ipqy0L/kypZgjMXOuxvuX40r22iaaSa1Wcfk9K13LkdPUK.','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:10:35','2023-08-05 05:10:35'),(15,NULL,'0123456789','user1','$2a$10$W7t8CzGRwFHNnBYaRYanSePZq7SWVOA1NSSAbPnV/vHqnRLNPZTcW','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:12:26','2023-08-05 05:12:26'),(16,NULL,'0123456789','user1','$2a$10$B5I9M7mMOYyqViwKkHkzDO5Nips0lbQvqtncakkXi5RAAl0Ud48jG','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-08-05 05:12:56','2023-08-05 05:12:56'),(19,NULL,'0123456789','user1','$2a$10$EKT4/C1R.IW.S/mwvXWquuk/NAqyVpaCw4m8AWqNC2PpNSjg7Ka/m','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','true',13,13,'2023-08-11 07:58:01','2023-08-11 07:58:01'),(20,NULL,'0123456789','user1','$2a$10$5hei6j/1Ha5IAlUtExQZYey/liAhvWUUmmt3AYmHi95yZ3AJ3/jXO','Tang','Sugar','user1','user1@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','true',13,13,'2023-08-11 08:02:25','2023-08-11 08:02:25'),(21,NULL,'0123456789','user2','$2a$10$jia14HAWymjYsSlco/cBWuuqa1pSjwQFv2D0.TLtyhu64ui2fOw.K','Tang','Sugar','user2','user2@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-12-15 06:55:59','2023-12-15 06:55:59'),(22,NULL,'0123456789','user2','$2a$10$w0bExpRxqBKxCALa.HOpheLbd1c9jzkbpq2lqF1P/5K.DizTx5vMu','Tang','Sugar','user2','user2@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-12-15 06:56:00','2023-12-15 06:56:00'),(23,NULL,'0123456789','user2','$2a$10$NTfZ9YJ.pzrWx0cUP5222OMq4fjO6/dP/iQ40Ze2Yy8EOGpwTCE82','Tang','Sugar','user2','user2@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-12-15 06:56:03','2023-12-15 06:56:03'),(24,NULL,'0123456789','user2','$2a$10$vd0Bh6NGL5CBZzUXOaRi1eC.K9WIAZuwboXy1ATephCkEXe5.6w3S','Tang','Sugar','user2','user2@gmail.com',NULL,'normal_user',NULL,'0123456788','user1verified@gmail.com',NULL,'true','false',13,13,'2023-12-15 06:56:04','2023-12-15 06:56:04');
/*!40000 ALTER TABLE `tbl_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 14:07:01
