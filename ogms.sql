-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2023 at 07:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ogms`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL,
  `prod_name` varchar(20) NOT NULL,
  `prod_qty` int(4) NOT NULL,
  `prod_category` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `prod_name`, `prod_qty`, `prod_category`, `createdAt`, `updatedAt`) VALUES
(3, 'orange_juice', 12, 'Drinks', '2023-06-02 10:59:52', '2023-06-15 04:40:54'),
(6, 'vietnam_juice', 13, 'Drinks', '2023-06-03 04:58:52', '2023-06-15 04:40:16'),
(7, 'dendobrium', 11, 'flowers', '2023-06-03 08:52:12', '2023-06-03 08:52:12'),
(8, 'lolipop', 20, 'food', '2023-06-03 09:13:04', '2023-06-14 15:25:20'),
(10, 'melon', 4, 'food', '2023-06-03 09:33:14', '2023-06-03 09:33:14'),
(12, '100 plus', 2, 'drinks', '2023-06-03 13:09:40', '2023-06-03 13:09:40'),
(15, 'pencil', 2, 'tools', '2023-06-04 02:58:01', '2023-06-04 02:58:01'),
(16, 'scissors', 13, 'tools', '2023-06-04 02:59:55', '2023-06-15 04:39:47'),
(17, 'ink', 1, 'tools', '2023-06-04 02:59:55', '2023-06-04 02:59:55'),
(18, 'earphones', 3, 'tools', '2023-06-04 02:59:55', '2023-06-04 02:59:55'),
(22, 'chair', 11, 'tools', '2023-06-13 07:50:29', '2023-06-13 07:50:29'),
(23, 'cpu', 11, 'tools', '2023-06-13 07:50:29', '2023-06-13 07:50:29'),
(24, 'table', 1, 'tools', '2023-06-13 08:20:21', '2023-06-13 08:20:21'),
(25, 'grape', 1, 'fruits', '2023-06-13 08:46:28', '2023-06-13 08:46:28');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `trans_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `trans_qty` int(11) NOT NULL,
  `trans_status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`trans_id`, `prod_id`, `trans_qty`, `trans_status`, `createdAt`, `updatedAt`) VALUES
(1, 16, 10, 1, '2023-06-15 04:39:47', '2023-06-15 04:39:47'),
(2, 3, 1, 1, '2023-06-15 04:40:16', '2023-06-15 04:40:16'),
(3, 6, 1, 1, '2023-06-15 04:40:16', '2023-06-15 04:40:16'),
(4, 3, 5, 0, '2023-06-15 04:40:54', '2023-06-15 04:40:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_passw` varchar(255) NOT NULL,
  `user_type` varchar(5) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_passw`, `user_type`, `user_status`, `createdAt`, `updatedAt`) VALUES
(2, 'nicole', 'nicole@admin.com', '$2b$10$nrxWvDIX3.NV8RGlc5wLbOp1QJdG//DhKmO8fcdHOtRPHERQZU.xy', 'admin', 1, '2023-06-14 17:40:26', '2023-06-14 17:40:26'),
(3, 'admin', 'admin@admin.com', '$2b$10$wNT32xqSQB3zQ75wgc18xery6b197lWCqbpx..zzvp7g9O8ag8qry', 'admin', 1, '2023-06-14 17:40:44', '2023-06-14 17:40:44'),
(5, 'user', 'user@user.com', '$2b$10$iCb7XBt1xmLB9Z01q0i.4Oy0JXJRf4sHWH3wCy9Hbks0lMA4OyRD2', 'user', 1, '2023-06-15 04:31:00', '2023-06-15 04:31:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`trans_id`,`prod_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
