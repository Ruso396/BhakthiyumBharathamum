-- Database: bhakthiyum_bharathamum
-- phpMyAdmin SQL Dump

CREATE DATABASE IF NOT EXISTS `bhakthiyum_bharathamum` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bhakthiyum_bharathamum`;

-- --------------------------------------------------------

-- Table structure for table `participants`

CREATE TABLE `participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registration_number` varchar(20) NOT NULL,
  `category` enum('Master','Student') NOT NULL,
  `name` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `age` int(3) NOT NULL,
  `address` text NOT NULL,
  `district` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `upi_id` varchar(255) NOT NULL,
  `payment_screenshot` varchar(255) NOT NULL,
  `payment_status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_number` (`registration_number`),
  UNIQUE KEY `phone_upi` (`phone`, `upi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

-- Table structure for table `admins`

CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin (username: admin, password: admin123)
-- Password is bcrypt hashed using PHP password_hash()

INSERT INTO `admins` (`username`, `password`) VALUES
('admin', '$2y$10$dnqi9FKwDwKXs4fBS/H84ul9A3cw2Zwkn.t4ChFaWpb44BvTYwSya');
