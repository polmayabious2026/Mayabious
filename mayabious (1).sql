-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2026 at 05:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mayabious`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'polsarkar', '$2b$10$IlPyTkC1085AffHCicgIaunAScZprQUWNSMtYv8jcp1gu5oWd8/PO', '1', '2026-10-01 09:19:18', '2026-10-01 09:19:18');

-- --------------------------------------------------------

--
-- Table structure for table `applycandidate`
--

CREATE TABLE `applycandidate` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `resume` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applycandidate`
--

INSERT INTO `applycandidate` (`id`, `department_id`, `designation_id`, `user_name`, `phone`, `email`, `resume`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'Pol Sarkar', '9876543210', 'johnpol@gmail.com', '1790610265062-discussion_1781698237507.pdf', '2026-09-28 15:44:25', '2026-09-28 15:44:25'),
(2, 3, 1, 'Pol Sarkar', '9876543210', 'johnpol@gmail.com', '1790610270133-discussion_1781698237507.pdf', '2026-09-28 15:44:30', '2026-09-28 15:44:30'),
(3, 3, 1, 'Pol sarkar', '7908538916', 'sarkar123@gmail.com', '1791376666191-DocScanner 24-Aug-2026 9-16 am.pdf', '2026-10-07 12:37:46', '2026-10-07 12:37:46');

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`id`, `title`, `description`, `image`, `date`, `status`, `created_at`, `updated_at`) VALUES
(4, 'MOST CREATIVE ANIMATED DESIGN THREE', 'Mayabious Group earned a Bronze at the ET Awards for Design & Creativity for Ambuja Neotia Utpalla Walkthrough', '1791282422437-Screenshot 2026-09-25 153749.jpg', 'Aug 20,2026', '1', '2026-10-06 10:27:02', '2026-10-06 10:27:02');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `small_image` varchar(255) NOT NULL,
  `big_image` varchar(255) NOT NULL,
  `popular_blogs` varchar(255) DEFAULT '0' COMMENT '1 = yes,0 = no',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `date`, `heading`, `title`, `description`, `small_image`, `big_image`, `popular_blogs`, `created_at`, `updated_at`) VALUES
(3, 'July 21,2026', 'BEST LOCATION FOR NRIS INVESTING IN SILIGURI NO TWO', 'SHOULD BE YOUR NEXT TRAVEL DESTINATION NO TWO', 'If you’re a tech junkie, you may want to share your passion through a blog.\r\n\r\nA tech blog usually features the latest news on technology and its applications in various fields such as science, entertainment, and business. Some technology blogs also feature reviews of newly released gadgets, making it one of the most profitable blog niches you can choose.', '1790764144784-blog_small_image_2026-09-26 182705.jpg', '1790764144788-Blogs_Big_image_2026-09-26 182744.jpg', '1', '2026-09-30 10:29:04', '2026-09-30 10:29:04'),
(4, 'June 05,2025', 'BEST LOCATION FOR NRIS INVESTING IN SILIGURI NO TWO', 'SHOULD BE YOUR NEXT TRAVEL DESTINATION NO TWO', 'If you’re a tech junkie, you may want to share your passion through a blog updated checkkkkk twoo', '1790765110741-blog_small_image_2026-09-26 182705.jpg', '1790765110745-Blogs_Big_image_2026-09-26 182744.jpg', '1', '2026-09-30 10:45:10', '2026-09-30 10:46:07');

-- --------------------------------------------------------

--
-- Table structure for table `blogcategory`
--

CREATE TABLE `blogcategory` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogcategory`
--

INSERT INTO `blogcategory` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'INVEST', '1', '2026-09-30 10:14:24', '2026-09-30 10:14:24'),
(2, 'BLOCK CHAIN', '1', '2026-09-30 10:14:24', '2026-09-30 10:14:24'),
(4, 'NEWS', '1', '2026-09-30 10:44:36', '2026-09-30 10:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `blognblogcategory`
--

CREATE TABLE `blognblogcategory` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `blogcategory_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blognblogcategory`
--

INSERT INTO `blognblogcategory` (`id`, `blog_id`, `blogcategory_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, '2026-09-30 10:29:04', '2026-09-30 10:29:04'),
(2, 3, 2, '2026-09-30 10:29:04', '2026-09-30 10:29:04'),
(6, 4, 1, '2026-09-30 10:47:34', '2026-09-30 10:47:34'),
(7, 4, 4, '2026-09-30 10:47:34', '2026-09-30 10:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` int(11) NOT NULL,
  `bannerimage` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`id`, `bannerimage`, `status`, `created_at`, `updated_at`) VALUES
(1, '1790597014155-Career_banner 2026-09-28 173314.jpg', '1', '2026-09-28 12:03:34', '2026-09-28 12:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `logo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'PS GROUP', '1790339679241-psgroup_images.png', '1', '2026-09-25 12:34:39', '2026-09-25 12:34:39'),
(2, 'TATA STEEL .', '1791283333783-tata-steel-logo.png', '1', '2026-09-25 12:48:34', '2026-10-06 10:42:13'),
(3, 'SHAPOORJI PALLONJI', '1791208927850-shapoorji 2026-10-05 191741.jpg', '1', '2026-10-05 14:02:07', '2026-10-05 14:02:07'),
(4, 'LLOYAD', '1791208927853-LLOYDS 2026-10-05 192034.jpg', '1', '2026-10-05 14:02:07', '2026-10-05 14:02:07');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `office_hours` varchar(255) NOT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `phone`, `email`, `office_hours`, `facebook`, `linkedin`, `twitter`, `instagram`, `status`, `created_at`, `updated_at`) VALUES
(1, '+91 33 2367 0142 / +91 80170 88220 / +91 90 0744 8711  HR Contact: +91 80170 88223', 'contactus@mygabious.com', 'Mon - Sat: 10am - 6pm\nSun - Closed', 'https://facebook.com/mayabious', 'https://linkedin.com/company/mayabious', 'https://twitter.com/mayabious', 'https://instagram.com/mayabious', '1', '2026-09-30 13:49:07', '2026-09-30 14:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Human Resource', '1', '2026-09-28 13:18:13', '2026-09-28 13:18:13'),
(3, 'Information Technology', '1', '2026-09-28 13:18:57', '2026-09-28 13:18:57'),
(4, 'Marketing', '1', '2026-09-28 13:19:08', '2026-09-28 13:19:08'),
(5, 'Operations', '1', '2026-09-28 13:19:21', '2026-09-28 13:19:21');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `department_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 'FULLSTACK DEVELOPER (GO+REACT)', '1', '2026-09-28 13:32:03', '2026-09-28 13:42:14');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiry`
--

INSERT INTO `enquiry` (`id`, `name`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Arnab Das', 'arnab123@gmail.com', '7908538916', 'I am interested for the 3D design', '2026-10-07 12:28:56', '2026-10-07 12:28:56');

-- --------------------------------------------------------

--
-- Table structure for table `homegallerybigimg`
--

CREATE TABLE `homegallerybigimg` (
  `id` int(11) NOT NULL,
  `homeimagegallery_id` int(11) NOT NULL,
  `big_image` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homegallerybigimg`
--

INSERT INTO `homegallerybigimg` (`id`, `homeimagegallery_id`, `big_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '1791371063411-home-gal-big-img-one07 161459.jpg', '1', '2026-10-07 11:04:23', '2026-10-07 11:04:23'),
(2, 1, '1791371063414-home-gal-big-img-2-Screenshot 2026-10-07 161535.jpg', '1', '2026-10-07 11:04:23', '2026-10-07 11:04:23'),
(3, 1, '1791371063415-home-gal-big-img-2-Screenshot 2026-10-07 161535.jpg', '1', '2026-10-07 11:04:23', '2026-10-07 11:04:23'),
(4, 2, '1791372579794-home-gal-big-img-one07 161459.jpg', '1', '2026-10-07 11:29:39', '2026-10-07 11:29:39'),
(5, 2, '1791372579799-home-gal-big-img-2-Screenshot 2026-10-07 161535.jpg', '1', '2026-10-07 11:29:39', '2026-10-07 11:29:39'),
(6, 2, '1791372579800-home-gal-big-img-2-Screenshot 2026-10-07 161535.jpg', '1', '2026-10-07 11:29:39', '2026-10-07 11:29:39');

-- --------------------------------------------------------

--
-- Table structure for table `homeimagegallery`
--

CREATE TABLE `homeimagegallery` (
  `id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `service_sub_category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `small_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `stack` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeimagegallery`
--

INSERT INTO `homeimagegallery` (`id`, `service_category_id`, `service_sub_category_id`, `title`, `small_image`, `description`, `stack`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'VIRTUAL REALITY(VR)', '1791371063405-home-gallery-small-image-Screenshot 2026-10-07 161427.jpg', 'Virtual Reality is one of the most cutting edge and innovative practices in the realm of product showcasing. A wide spectrum of application coupled with an exciting experience for the users ensure the rapid propagation of Virtual Reality', 'xml, JavaScript, KRPANO and Unitity Engine', '1', '2026-10-07 11:04:23', '2026-10-07 11:04:23'),
(2, 1, 1, 'INTERNET OF THINGS', '1791372579787-home-small-img-2Screenshot 2026-10-07 165835.jpg', 'Mayabious pioneers smart so…', 'Flutter, Python, Flask and Dart', '1', '2026-10-07 11:29:39', '2026-10-07 11:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `homevideo`
--

CREATE TABLE `homevideo` (
  `id` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homevideo`
--

INSERT INTO `homevideo` (`id`, `video`, `position`, `status`, `created_at`, `updated_at`) VALUES
(1, '1791296251035-197485-905015019_medium.mp4', 1, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(2, '1791296251070-197483-905015011_medium.mp4', 2, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(3, '1791298951173-43551-436719118_medium.mp4', 2, '1', '2026-10-06 14:17:31', '2026-10-06 15:02:31'),
(4, '1791296251133-197483-905015011_medium.mp4', 4, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(5, '1791296251149-197485-905015019_medium.mp4', 5, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(6, '1791296251179-197485-905015019_medium.mp4', 6, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(7, '1791296251209-197485-905015019_medium.mp4', 7, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(8, '1791296251235-197483-905015011_medium.mp4', 8, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(9, '1791296251258-43551-436719118_medium.mp4', 9, '1', '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(10, '1791296260687-197485-905015019_medium.mp4', 1, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(11, '1791296260715-197483-905015011_medium.mp4', 2, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(12, '1791296260736-43551-436719118_medium.mp4', 3, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(13, '1791296260771-197483-905015011_medium.mp4', 4, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(14, '1791296260795-197485-905015019_medium.mp4', 5, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(15, '1791296260819-197485-905015019_medium.mp4', 6, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(16, '1791296260850-197485-905015019_medium.mp4', 7, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(17, '1791296260875-197483-905015011_medium.mp4', 8, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(18, '1791296260894-43551-436719118_medium.mp4', 9, '1', '2026-10-06 14:17:40', '2026-10-06 14:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `homevideoset`
--

CREATE TABLE `homevideoset` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homevideoset`
--

INSERT INTO `homevideoset` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'set test 1', '2026-10-06 14:17:22', '2026-10-06 14:17:22'),
(2, 'set test 2', '2026-10-06 14:17:22', '2026-10-06 14:17:22'),
(3, 'set test 3', '2026-10-06 14:17:22', '2026-10-06 14:17:22');

-- --------------------------------------------------------

--
-- Table structure for table `homevideo_nhomevideoset`
--

CREATE TABLE `homevideo_nhomevideoset` (
  `id` int(11) NOT NULL,
  `homevideo_id` int(11) DEFAULT NULL,
  `homevideoset_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homevideo_nhomevideoset`
--

INSERT INTO `homevideo_nhomevideoset` (`id`, `homevideo_id`, `homevideoset_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(2, 2, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(3, 3, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(4, 4, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(5, 5, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(6, 6, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(7, 7, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(8, 8, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(9, 9, 1, '2026-10-06 14:17:31', '2026-10-06 14:17:31'),
(10, 10, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(11, 11, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(12, 12, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(13, 13, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(14, 14, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(15, 15, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(16, 16, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(17, 17, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40'),
(18, 18, 2, '2026-10-06 14:17:40', '2026-10-06 14:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `jobtype`
--

CREATE TABLE `jobtype` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobtype`
--

INSERT INTO `jobtype` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'FULL TIME', '2026-09-29 13:12:13', '2026-09-29 13:12:13'),
(2, 'PART TIME', '2026-09-29 13:12:13', '2026-09-29 13:12:13'),
(4, 'INTERNSHIP', '2026-09-29 13:12:13', '2026-09-29 13:12:13');

-- --------------------------------------------------------

--
-- Table structure for table `jobvacancy`
--

CREATE TABLE `jobvacancy` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `jobtype_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobvacancy`
--

INSERT INTO `jobvacancy` (`id`, `department_id`, `designation_id`, `description`, `status`, `created_at`, `updated_at`, `jobtype_id`) VALUES
(1, 3, 1, 'We are seeking a highly skilled Full Stack Developer with deep expertise in React.js to join our growing engineering team. In this role, you will take high ownership of core product surfaces end-to-end—spanning clean backend system architecture, high-perf', '1', '2026-09-29 13:46:34', '2026-09-29 13:46:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobvacancyjobtype`
--

CREATE TABLE `jobvacancyjobtype` (
  `id` int(11) NOT NULL,
  `jobvacancy_id` int(11) NOT NULL,
  `jobtype_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobvacancyjobtype`
--

INSERT INTO `jobvacancyjobtype` (`id`, `jobvacancy_id`, `jobtype_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-09-29 13:46:34', '2026-09-29 13:46:34'),
(2, 1, 2, '2026-09-29 13:46:34', '2026-09-29 13:46:34'),
(3, 1, 4, '2026-09-29 13:46:34', '2026-09-29 13:46:34');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `channel_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `type` varchar(255) DEFAULT '1' COMMENT '1 = Digital Media, 0 = Print Media',
  `url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `channel_name`, `description`, `image`, `date`, `status`, `type`, `url`, `created_at`, `updated_at`) VALUES
(1, 'ANI NEWS', 'MAYABIOUS GROUP WIN FOUR METALS AT THE ECONOMIC TIMES FOR DESIGN  AND CREATIVITY', '1791211795065-Screenshot 2026-09-26 180355.jpg', 'April 9,2026', '1', '1', 'https://aninews.in/news/business/mayabious-group-wins-four-metals-at-the-economic-times-award-for-design-and-creativity20260409174349/', '2026-10-05 14:49:55', '2026-10-05 14:49:55'),
(2, 'HINDUSTHAN SAMACHAR', 'MAYABIOUS GROUP RECIEVES NATIONAL RECOGNITION FOR', '1791211953414-Screenshot 2026-09-26 180355.jpg', 'April 8,2026', '1', '0', 'https://bengali.hindusthansamachar.in/Encyc/2026/4/8/Mayabious-Group-won-Awards.php', '2026-10-05 14:52:33', '2026-10-05 14:52:33'),
(3, 'ANI NEWS', 'MAYABIOUS GROUP WIN FOUR METALS AT THE ECONOMIC TIMES', '1791366015739-Screenshot 2026-09-26 180355.jpg', 'July 10 ,2026', '1', '1', 'https://aninews.in/news/business/mayabious-group-wins-four-metals-at-the-economic-times-award-for-design-and-creativity20260409174349/', '2026-10-07 09:40:15', '2026-10-07 09:40:15');

-- --------------------------------------------------------

--
-- Table structure for table `perksandbenifit`
--

CREATE TABLE `perksandbenifit` (
  `id` int(11) NOT NULL,
  `career_id` int(11) NOT NULL,
  `option` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perksandbenifit`
--

INSERT INTO `perksandbenifit` (`id`, `career_id`, `option`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Embrace Flexiblity with Adaptable Schedules and Versatile Working Hours', '1790682249843-perksimage1.jpg', '1', '2026-09-29 11:44:09', '2026-09-29 11:44:09'),
(2, 1, 'Strategic Compensation and Employee Recognition Packages', '1790682249846-perksimage2.jpg', '1', '2026-09-29 11:44:09', '2026-09-29 11:44:09'),
(3, 1, 'Unlocking Peak Productivity Through a Remote First Work Model', '1790682249847-perksimage3_2026-09-29 165900.jpg', '1', '2026-09-29 11:44:09', '2026-09-29 11:44:09');

-- --------------------------------------------------------

--
-- Table structure for table `servicecategory`
--

CREATE TABLE `servicecategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicecategory`
--

INSERT INTO `servicecategory` (`id`, `name`, `description`, `icon`, `status`, `created_at`, `updated_at`) VALUES
(1, '3D VISUALIZATION', 'Our expertise in visualization of architect\'s idea acts as an efficient marketing tool for our clients', '', '1', '2026-09-22 15:06:41', '2026-09-22 15:06:41'),
(2, 'AUGMENTED REALITY AND VIRTUAL REALITY', 'Augmented Reality and Virtual Reality are two of the most cutting edge and innovative practices in the realm of product showcasing', '1791386244713-icon-2026-10-07 204534.jpg', '1', '2026-09-22 15:08:42', '2026-10-07 15:17:24');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `service_sub_category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `small_image` varchar(255) NOT NULL,
  `big_image` varchar(255) DEFAULT NULL,
  `youtube_link` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_category_id`, `service_sub_category_id`, `title`, `description`, `small_image`, `big_image`, `youtube_link`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '3D ELEVATION DESIGN', 'This is description of 3D elevation design', '1791284862724-service_small_image.jpg', '1791284862728-service_big_image.jpg', NULL, '1', '2026-10-06 11:07:42', '2026-10-06 11:07:42'),
(2, 1, 2, 'AERIAL VIEW 2D', 'This is description of aerial view', '1791284862732-service_small_image-2.jpg', '1791285576014-Raymond_026-10-05 165831.jpg', 'youtube.com', '1', '2026-10-06 11:07:42', '2026-10-06 11:19:36'),
(3, 1, 2, '3D ELEVATION DESIGN', 'This is description of 3D elevation design', '1791284933189-service_small_image.jpg', NULL, 'youtube.com', '1', '2026-10-06 11:08:53', '2026-10-06 11:08:53'),
(5, 1, 2, '3D ELEVATION DESIGN', 'This is description of 3D elevation design', '1791367777944-service_small_image.jpg', '1791367777950-service_big_image.jpg', 'https://youtube.com', '1', '2026-10-07 10:09:37', '2026-10-07 10:09:37'),
(8, 1, 2, 'AERIAL VIEW', 'This is description of aerial view', '1791368272388-service_small_image-2.jpg', NULL, 'https://youtube.com', '1', '2026-10-07 10:17:52', '2026-10-07 10:17:52'),
(9, 1, 2, '3D ELEVATION DESIGN', 'This is description of 3D elevation design', '1791368518506-service_small_image.jpg', '1791368518510-service_big_image.jpg', NULL, '1', '2026-10-07 10:21:58', '2026-10-07 10:21:58'),
(10, 1, 2, 'AERIAL VIEW', 'This is description of aerial view', '1791368518514-service_small_image-2.jpg', NULL, 'https://youtube.com', '1', '2026-10-07 10:21:58', '2026-10-07 10:21:58');

-- --------------------------------------------------------

--
-- Table structure for table `servicesubcategory`
--

CREATE TABLE `servicesubcategory` (
  `id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicesubcategory`
--

INSERT INTO `servicesubcategory` (`id`, `service_category_id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '3d elevation design', '3D elevation design is the key to unlocking your architectural concepts visual potential.', '1', '2026-09-24 09:24:17', '2026-09-24 09:24:17'),
(2, 1, '3d landscape design', '3D landscape design converts abstract landscaping concepts into real marvels.', '1', '2026-09-24 09:26:37', '2026-09-24 09:26:37'),
(3, 1, '3d amenity design', 'With 3D amenity design, even the most complex fun and lifestyle can find their useful potential marketed and enhanecd.', '1', '2026-09-24 09:45:22', '2026-09-24 09:45:22');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `designation`, `image`, `content`, `facebook`, `linkedin`, `twitter`, `instagram`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ARINDAM DAS GUPTA', 'Founder & CEO', '1790770027645-team_istockphoto-2172317014-612x612.jpg', 'This is Content', 'user@facebook.com', NULL, NULL, 'user@instagram.com', '1', '2026-09-30 12:07:07', '2026-09-30 12:07:07'),
(2, 'SOURAV DAS', 'CTO', '1790770118393-team_istockphoto-2172317014-612x612.jpg', 'This is Content section', NULL, 'user@linkedin.com', 'user@twitter.com', NULL, '1', '2026-09-30 12:08:38', '2026-09-30 12:08:38');

-- --------------------------------------------------------

--
-- Table structure for table `value`
--

CREATE TABLE `value` (
  `id` int(11) NOT NULL,
  `career_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `value`
--

INSERT INTO `value` (`id`, `career_id`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'WORK LIFE BALANCE', 'We provide a healthy work-life balance.', '1', '2026-09-29 11:07:38', '2026-09-29 11:07:38'),
(2, 1, 'CAREER GROWTH', 'We provide excellent opportunities for career growth.', '1', '2026-09-29 11:07:38', '2026-09-29 11:07:38'),
(3, 1, 'LEARNING', 'Employees get continuous learning opportunities.', '1', '2026-09-29 11:07:38', '2026-09-29 11:07:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applycandidate`
--
ALTER TABLE `applycandidate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `designation_id` (`designation_id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogcategory`
--
ALTER TABLE `blogcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blognblogcategory`
--
ALTER TABLE `blognblogcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blognblogcategory_blogcategory_id_blog_id_unique` (`blog_id`,`blogcategory_id`),
  ADD KEY `blogcategory_id` (`blogcategory_id`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homegallerybigimg`
--
ALTER TABLE `homegallerybigimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homeimagegallery`
--
ALTER TABLE `homeimagegallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_category_id` (`service_category_id`),
  ADD KEY `service_sub_category_id` (`service_sub_category_id`);

--
-- Indexes for table `homevideo`
--
ALTER TABLE `homevideo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homevideoset`
--
ALTER TABLE `homevideoset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homevideo_nhomevideoset`
--
ALTER TABLE `homevideo_nhomevideoset`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `homevideo_nhomevideoSet_homevideo_id_homevideoset_id_unique` (`homevideo_id`,`homevideoset_id`),
  ADD KEY `homevideoset_id` (`homevideoset_id`);

--
-- Indexes for table `jobtype`
--
ALTER TABLE `jobtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobvacancy`
--
ALTER TABLE `jobvacancy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `designation_id` (`designation_id`),
  ADD KEY `jobtype_id` (`jobtype_id`);

--
-- Indexes for table `jobvacancyjobtype`
--
ALTER TABLE `jobvacancyjobtype`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jobvacancyjobtype_jobtype_id_jobvacancy_id_unique` (`jobvacancy_id`,`jobtype_id`),
  ADD KEY `jobtype_id` (`jobtype_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perksandbenifit`
--
ALTER TABLE `perksandbenifit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `career_id` (`career_id`);

--
-- Indexes for table `servicecategory`
--
ALTER TABLE `servicecategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_category_id` (`service_category_id`),
  ADD KEY `service_sub_category_id` (`service_sub_category_id`);

--
-- Indexes for table `servicesubcategory`
--
ALTER TABLE `servicesubcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_category_id` (`service_category_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `value`
--
ALTER TABLE `value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `career_id` (`career_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `applycandidate`
--
ALTER TABLE `applycandidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blogcategory`
--
ALTER TABLE `blogcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blognblogcategory`
--
ALTER TABLE `blognblogcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `career`
--
ALTER TABLE `career`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homegallerybigimg`
--
ALTER TABLE `homegallerybigimg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `homeimagegallery`
--
ALTER TABLE `homeimagegallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `homevideo`
--
ALTER TABLE `homevideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `homevideoset`
--
ALTER TABLE `homevideoset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `homevideo_nhomevideoset`
--
ALTER TABLE `homevideo_nhomevideoset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `jobtype`
--
ALTER TABLE `jobtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobvacancy`
--
ALTER TABLE `jobvacancy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobvacancyjobtype`
--
ALTER TABLE `jobvacancyjobtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perksandbenifit`
--
ALTER TABLE `perksandbenifit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `servicecategory`
--
ALTER TABLE `servicecategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `servicesubcategory`
--
ALTER TABLE `servicesubcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `value`
--
ALTER TABLE `value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applycandidate`
--
ALTER TABLE `applycandidate`
  ADD CONSTRAINT `applycandidate_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applycandidate_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blognblogcategory`
--
ALTER TABLE `blognblogcategory`
  ADD CONSTRAINT `blognblogcategory_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blognblogcategory_ibfk_2` FOREIGN KEY (`blogcategory_id`) REFERENCES `blogcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `designation`
--
ALTER TABLE `designation`
  ADD CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `homeimagegallery`
--
ALTER TABLE `homeimagegallery`
  ADD CONSTRAINT `homeimagegallery_ibfk_1` FOREIGN KEY (`service_category_id`) REFERENCES `servicecategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `homeimagegallery_ibfk_2` FOREIGN KEY (`service_sub_category_id`) REFERENCES `servicesubcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `homevideo_nhomevideoset`
--
ALTER TABLE `homevideo_nhomevideoset`
  ADD CONSTRAINT `homevideo_nhomevideoset_ibfk_1` FOREIGN KEY (`homevideo_id`) REFERENCES `homevideo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `homevideo_nhomevideoset_ibfk_2` FOREIGN KEY (`homevideoset_id`) REFERENCES `homevideoset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jobvacancy`
--
ALTER TABLE `jobvacancy`
  ADD CONSTRAINT `jobvacancy_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobvacancy_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobvacancy_ibfk_3` FOREIGN KEY (`jobtype_id`) REFERENCES `jobtype` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `jobvacancyjobtype`
--
ALTER TABLE `jobvacancyjobtype`
  ADD CONSTRAINT `jobvacancyjobtype_ibfk_1` FOREIGN KEY (`jobvacancy_id`) REFERENCES `jobvacancy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobvacancyjobtype_ibfk_2` FOREIGN KEY (`jobtype_id`) REFERENCES `jobtype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `perksandbenifit`
--
ALTER TABLE `perksandbenifit`
  ADD CONSTRAINT `perksandbenifit_ibfk_1` FOREIGN KEY (`career_id`) REFERENCES `career` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`service_category_id`) REFERENCES `servicecategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_2` FOREIGN KEY (`service_sub_category_id`) REFERENCES `servicesubcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `servicesubcategory`
--
ALTER TABLE `servicesubcategory`
  ADD CONSTRAINT `servicesubcategory_ibfk_1` FOREIGN KEY (`service_category_id`) REFERENCES `servicecategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `value`
--
ALTER TABLE `value`
  ADD CONSTRAINT `value_ibfk_1` FOREIGN KEY (`career_id`) REFERENCES `career` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
