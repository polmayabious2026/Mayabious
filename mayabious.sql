-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2026 at 05:20 PM
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
(2, 3, 1, 'Pol Sarkar', '9876543210', 'johnpol@gmail.com', '1790610270133-discussion_1781698237507.pdf', '2026-09-28 15:44:30', '2026-09-28 15:44:30');

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
(1, 'CREATIVE ANIMATED DESIGN', 'Mayabious Group earned a Bronze at the ET Awards for Design & Creativity for Ambuja Neotia Utpalla Walkthrough', '1790342479415-Screenshot 2026-09-25 153749.jpg', '20-09-2026', '1', '2026-09-25 13:21:19', '2026-09-25 13:31:33');

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
(2, 'TATA STEEL .', '1790340514860-tata-steel-logo.png', '1', '2026-09-25 12:48:34', '2026-09-25 13:00:49');

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
-- Table structure for table `homeimagegallery`
--

CREATE TABLE `homeimagegallery` (
  `id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `service_sub_category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeimagegallery`
--

INSERT INTO `homeimagegallery` (`id`, `service_category_id`, `service_sub_category_id`, `title`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'INNOVATIVE VIRTUAL SHOWCASING', '1790693160053-Events.webp', '1', '2026-09-29 14:46:00', '2026-09-29 14:46:00'),
(2, 1, 1, 'ADVANCED PRODUCT ENGAGEMENT UP', '1790693550374-image_gallery_Screenshot 2026-09-29 202158.jpg', '1', '2026-09-29 14:52:30', '2026-09-29 14:55:12');

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
(2, '1790078761499-197483-905015011_medium.mp4', 2, '1', '2026-09-22 12:06:01', '2026-09-22 12:06:01'),
(3, '1790078772496-197485-905015019_medium.mp4', 3, '1', '2026-09-22 12:06:12', '2026-09-22 12:06:12'),
(4, '1790083402958-197485-905015019_medium.mp4', 4, '1', '2026-09-22 13:23:23', '2026-09-22 13:23:23');

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
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `channel_name`, `description`, `image`, `date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ANI NEWS', 'MAYABIOUS GROUP WIN FOUR METALS AT THE ECONOMIC TIMES THERE', '1790426269762-Screenshot 2026-09-26 180355.jpg', 'July 10 ,2026', '1', '2026-09-26 12:37:49', '2026-09-26 12:43:13');

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
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicecategory`
--

INSERT INTO `servicecategory` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, '3D VISUALIZATION', 'Our expertise in visualization of architect\'s idea acts as an efficient marketing tool for our clients', '1', '2026-09-22 15:06:41', '2026-09-22 15:06:41'),
(2, 'AUGMENTED REALITY AND VIRTUAL REALITY', 'Augmented Reality and Virtual Reality are two of the most cutting edge and innovative practices in the realm of product showcasing', '1', '2026-09-22 15:08:42', '2026-09-22 15:08:42');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `service_sub_category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT '1' COMMENT '1 = active, 0 = inactive',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_category_id`, `service_sub_category_id`, `title`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'DESIGN_ONE', '1790251122684-Screenshot 2026-09-24 170733.jpg', '1', '2026-09-24 11:58:42', '2026-09-24 11:58:42'),
(2, 1, 2, 'DESIGN_TWO', '1790251122690-Screenshot 2026-09-24 170830.jpg', '1', '2026-09-24 11:58:42', '2026-09-24 11:58:42'),
(3, 1, 2, 'DESIGN_THREE_2D', '1790251122694-Screenshot 2026-09-24 170849.jpg', '1', '2026-09-24 11:58:42', '2026-09-24 12:16:29');

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
-- AUTO_INCREMENT for table `applycandidate`
--
ALTER TABLE `applycandidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT for table `homeimagegallery`
--
ALTER TABLE `homeimagegallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `homevideo`
--
ALTER TABLE `homevideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
