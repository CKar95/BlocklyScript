-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 14, 2020 at 09:09 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id14854195_blocklyscript`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `level11score` int(11) NOT NULL DEFAULT 0,
  `level1time` int(11) NOT NULL DEFAULT 0,
  `level2time` int(11) NOT NULL DEFAULT 0,
  `level3time` int(11) NOT NULL DEFAULT 0,
  `level4time` int(11) NOT NULL DEFAULT 0,
  `level5time` int(11) NOT NULL DEFAULT 0,
  `level6time` int(11) NOT NULL DEFAULT 0,
  `level7time` int(11) NOT NULL DEFAULT 0,
  `level8time` int(11) NOT NULL DEFAULT 0,
  `level9time` int(11) NOT NULL DEFAULT 0,
  `level10time` int(11) NOT NULL DEFAULT 0,
  `level11time` int(11) NOT NULL DEFAULT 0,
  `level1won` tinyint(1) NOT NULL DEFAULT 0,
  `level1score` int(11) NOT NULL DEFAULT 0,
  `level1start` int(11) NOT NULL DEFAULT 0,
  `level1moveleft` int(11) NOT NULL DEFAULT 0,
  `level1moveright` int(11) NOT NULL DEFAULT 0,
  `level1firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level1timesreseted` int(11) NOT NULL DEFAULT 0,
  `level1attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level1stars` int(11) NOT NULL DEFAULT 0,
  `level2won` tinyint(1) NOT NULL DEFAULT 0,
  `level2score` int(11) NOT NULL DEFAULT 0,
  `level2start` int(11) NOT NULL DEFAULT 0,
  `level2moveleft` int(11) NOT NULL DEFAULT 0,
  `level2moveright` int(11) NOT NULL DEFAULT 0,
  `level2firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level2timesreseted` int(11) NOT NULL DEFAULT 0,
  `level2attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level2stars` int(11) NOT NULL DEFAULT 0,
  `level2jump` int(11) NOT NULL DEFAULT 0,
  `level3won` tinyint(1) NOT NULL DEFAULT 0,
  `level3score` int(11) NOT NULL DEFAULT 0,
  `level3firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level3timesreseted` int(11) NOT NULL DEFAULT 0,
  `level3attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level3stars` int(11) NOT NULL DEFAULT 0,
  `level4won` tinyint(1) NOT NULL DEFAULT 0,
  `level4score` int(11) NOT NULL DEFAULT 0,
  `level4firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level4timesreseted` int(11) NOT NULL DEFAULT 0,
  `level4attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level4stars` int(11) NOT NULL DEFAULT 0,
  `level5won` tinyint(1) NOT NULL DEFAULT 0,
  `level5score` int(11) NOT NULL DEFAULT 0,
  `level5firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level5timesreseted` int(11) NOT NULL DEFAULT 0,
  `level5attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level5stars` int(11) NOT NULL DEFAULT 0,
  `level6won` tinyint(1) NOT NULL DEFAULT 0,
  `level6score` int(11) NOT NULL DEFAULT 0,
  `level6firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level6timesreseted` int(11) NOT NULL DEFAULT 0,
  `level6attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level6stars` int(11) NOT NULL DEFAULT 0,
  `level7won` tinyint(1) NOT NULL DEFAULT 0,
  `level7score` int(11) NOT NULL DEFAULT 0,
  `level7firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level7timesreseted` int(11) NOT NULL DEFAULT 0,
  `level7attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level7stars` int(11) NOT NULL DEFAULT 0,
  `level8won` tinyint(1) NOT NULL DEFAULT 0,
  `level8score` int(11) NOT NULL DEFAULT 0,
  `level8firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level8timesreseted` int(11) NOT NULL DEFAULT 0,
  `level8attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level8stars` int(11) NOT NULL DEFAULT 0,
  `level9won` tinyint(1) NOT NULL DEFAULT 0,
  `level9score` int(11) NOT NULL DEFAULT 0,
  `level9firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level9timesreseted` int(11) NOT NULL DEFAULT 0,
  `level9attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level9stars` int(11) NOT NULL DEFAULT 0,
  `level10score` int(11) NOT NULL DEFAULT 0,
  `level10firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level10timesreseted` int(11) NOT NULL DEFAULT 0,
  `level10attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level10stars` int(11) NOT NULL DEFAULT 0,
  `level11won` tinyint(1) NOT NULL DEFAULT 0,
  `level11firsttimewon` int(11) NOT NULL DEFAULT 0,
  `level11timesreseted` int(11) NOT NULL DEFAULT 0,
  `level11attempts` mediumtext COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `level11stars` int(11) NOT NULL DEFAULT 0,
  `level1badge` int(11) NOT NULL DEFAULT 0,
  `level2badge` int(11) NOT NULL DEFAULT 0,
  `level3badge` int(11) NOT NULL DEFAULT 0,
  `level4badge` int(11) NOT NULL DEFAULT 0,
  `level5badge` int(11) NOT NULL DEFAULT 0,
  `level6badge` int(11) NOT NULL DEFAULT 0,
  `level7badge` int(11) NOT NULL DEFAULT 0,
  `level8badge` int(11) NOT NULL DEFAULT 0,
  `level9badge` int(11) NOT NULL DEFAULT 0,
  `level10badge` int(11) NOT NULL DEFAULT 0,
  `level11badge` int(11) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL,
  `level10won` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `gender`, `level11score`, `level1time`, `level2time`, `level3time`, `level4time`, `level5time`, `level6time`, `level7time`, `level8time`, `level9time`, `level10time`, `level11time`, `level1won`, `level1score`, `level1start`, `level1moveleft`, `level1moveright`, `level1firsttimewon`, `level1timesreseted`, `level1attempts`, `level1stars`, `level2won`, `level2score`, `level2start`, `level2moveleft`, `level2moveright`, `level2firsttimewon`, `level2timesreseted`, `level2attempts`, `level2stars`, `level2jump`, `level3won`, `level3score`, `level3firsttimewon`, `level3timesreseted`, `level3attempts`, `level3stars`, `level4won`, `level4score`, `level4firsttimewon`, `level4timesreseted`, `level4attempts`, `level4stars`, `level5won`, `level5score`, `level5firsttimewon`, `level5timesreseted`, `level5attempts`, `level5stars`, `level6won`, `level6score`, `level6firsttimewon`, `level6timesreseted`, `level6attempts`, `level6stars`, `level7won`, `level7score`, `level7firsttimewon`, `level7timesreseted`, `level7attempts`, `level7stars`, `level8won`, `level8score`, `level8firsttimewon`, `level8timesreseted`, `level8attempts`, `level8stars`, `level9won`, `level9score`, `level9firsttimewon`, `level9timesreseted`, `level9attempts`, `level9stars`, `level10score`, `level10firsttimewon`, `level10timesreseted`, `level10attempts`, `level10stars`, `level11won`, `level11firsttimewon`, `level11timesreseted`, `level11attempts`, `level11stars`, `level1badge`, `level2badge`, `level3badge`, `level4badge`, `level5badge`, `level6badge`, `level7badge`, `level8badge`, `level9badge`, `level10badge`, `level11badge`, `id`, `level10won`) VALUES
('Desp', '202cb962ac59075b964b07152d234b70', 'boy', 2560, 13, 38, 46, 156, 719, 63, 363, 302, 270, 128, 98, 1, 100, 1, 2, 4, 13, 0, ' START [object Object],move left [object Object],move left [object Object],move right [object Object],move right [object Object],move right [object Object],move right [object Object]\n\n', 5, 1, 220, 1, 3, 6, 38, 0, ' START [object Object],jump [object Object],move left [object Object],jump [object Object],move left [object Object],move left [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object]\n\n', 7, 5, 1, 450, 46, 0, ' START [object Object],repeat 5 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 3 times do move left [object Object],move left [object Object],repeat 5 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 13, 1, 700, 156, 0, ' START [object Object],repeat while wall is not broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],jump [object Object],move right [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move left [object Object],move left [object Object],repeat 5 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 15, 1, 960, 719, 3, ' START [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],repeat 2 times do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 4 times do move left [object Object],move left [object Object],repeat 4 times do move right [object Object],move right [object Object]\n\nSTART [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],repeat 2 times do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 4 times do move left [object Object],move left [object Object],jump [object Object],repeat 4 times do move right [object Object],move right [object Object]\n\nSTART [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],repeat 2 times do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 4 times do move left [object Object],move left [object Object],repeat 4 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 19, 1, 1210, 63, 0, ' START [object Object],repeat 6 times do move left [object Object],move left [object Object],if star has: #f00 color do collect  #f00 star,star has: #f00 color,collect  #f00 star,repeat 6 times do jump [object Object],jump [object Object],move right [object Object],if star has: #f00 color do collect  #f00 star,star has: #f00 color,collect  #f00 star,repeat 3 times do jump [object Object],jump [object Object],move left [object Object]\n\n', 15, 1, 1440, 363, 1, ' START [object Object],use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],if star has: #f00 color do collect  #f00 star else if star has: #00f color do collect  #00f star else collect  #008000 star,star has: #f00 color,collect  #f00 star,star has: #00f color,collect  #00f star,collect  #008000 star,jump [object Object],move left [object Object],jump [object Object],move right [object Object],jump [object Object],move left [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 5 times do move left [object Object],move left [object Object]\n\nSTART [object Object],use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],if star has: #f00 color do collect  #f00 star else if star has: #00f color do collect  #00f star else collect  #008000 star,star has: #f00 color,collect  #f00 star,star has: #00f color,collect  #00f star,collect  #008000 star,jump [object Object],move left [object Object],jump [object Object],move right [object Object],jump [object Object],move left [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 5 times do move left [object Object],move left [object Object],if star has: #008000 color do collect  #008000 star,star has: #008000 color,collect  #008000 star\n\n', 14, 1, 1680, 302, 1, ' START [object Object],repeat 6 times do jump [object Object],jump [object Object],move right [object Object],if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon,star has: #f00 color,if star has balloon on top do jump and collect  #f00 balloon,star has balloon on top,jump and collect  #f00 balloon,collect  #f00 star,star has: #008000 color,if star has balloon on top do jump and collect  #008000 balloon,star has balloon on top,jump and collect  #008000 balloon,collect  #008000 star,jump [object Object],move left [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 5 times do move left [object Object],move left [object Object],if star has: #00f color do collect  #00f star,star has: #00f color,collect  #00f star\n\n', 15, 1, 1970, 270, 1, ' START [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],do something,jump [object Object],move right [object Object],repeat 6 times do jump [object Object],jump [object Object],move left [object Object],do something,Method name:  do something  if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon else if star has balloon on top do jump and collect  #00f balloon,if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon else if star has balloon on top do jump and collect  #00f balloon,star has: #f00 color,if star has balloon on top do jump and collect  #f00 balloon,star has balloon on top,jump and collect  #f00 balloon,collect  #f00 star,star has: #008000 color,if star has balloon on top do jump and collect  #008000 balloon,star has balloon on top,jump and collect  #008000 balloon,collect  #008000 star,if star has balloon on top do jump and collect  #00f balloon,star has balloon on top,jump and collect  #00f balloon,collect  #00f star\n\n', 20, 2360, 128, 0, ' START [object Object],do something,do something2,do something,do something2,do something,Method name:  do something  use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],Method name:  do something2  jump [object Object],jump [object Object],repeat 6 times do move left [object Object],move left [object Object],jump [object Object],move right [object Object]\n\n', 29, 1, 98, 0, ' START [object Object],set password to 2019,2019,open door with password: password,repeat 3 times do move right [object Object],move right [object Object],repeat 2 times do jump [object Object],jump [object Object],move left [object Object],jump [object Object],move right [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 3 times do move right [object Object],move right [object Object]\n\n', 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1),
('Nikos', '202cb962ac59075b964b07152d234b70', 'girl', 2560, 15, 135, 51, 112, 132, 70, 299, 145, 294, 110, 68, 1, 100, 1, 2, 4, 15, 0, ' START [object Object],move left [object Object],move left [object Object],move right [object Object],move right [object Object],move right [object Object],move right [object Object]\n\n', 5, 1, 210, 1, 3, 6, 57, 1, ' START [object Object],jump [object Object],move left [object Object],jump [object Object],move left [object Object],move left [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object],jump [object Object],move right [object Object]\n\nSTART [object Object],jump [object Object],move left [object Object],jump [object Object],move left [object Object],move left [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object],move right [object Object],jump [object Object],move right [object Object]\n\n', 7, 5, 1, 440, 51, 0, ' START [object Object],repeat 5 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 3 times do move left [object Object],move left [object Object],repeat 5 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 13, 1, 690, 112, 0, ' START [object Object],repeat while wall is not broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],jump [object Object],move right [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move left [object Object],move left [object Object],repeat 5 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 15, 1, 980, 132, 0, ' START [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],repeat 3 times do move left [object Object],move left [object Object],jump [object Object],repeat 3 times do move right [object Object],move right [object Object],jump [object Object],move left [object Object],repeat 2 times do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 4 times do move left [object Object],move left [object Object],repeat 4 times do jump [object Object],jump [object Object],move right [object Object]\n\n', 19, 1, 1230, 70, 0, ' START [object Object],repeat 6 times do move left [object Object],move left [object Object],if star has: #f00 color do collect  #f00 star,star has: #f00 color,collect  #f00 star,repeat 6 times do jump [object Object],jump [object Object],move right [object Object],if star has: #f00 color do collect  #f00 star,star has: #f00 color,collect  #f00 star,jump [object Object],repeat 3 times do move left [object Object],move left [object Object]\n\n', 15, 1, 1450, 299, 2, ' START [object Object],use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do if star has: #f00 color do collect  #f00 star else if star has: #008000 color do collect  #008000 star,if star has: #f00 color do collect  #f00 star else if star has: #008000 color do collect  #008000 star,star has: #f00 color,collect  #f00 star,star has: #008000 color,collect  #008000 star,jump [object Object],move left [object Object],jump [object Object],move right [object Object],jump [object Object],move left [object Object]\n\nSTART [object Object],use laser beam [object Object] shoot beam right,shoot beam right,repeat 6 times do move right [object Object],move right [object Object],if star has: #f00 color do collect  #f00 star else if star has: #008000 color do collect  #008000 star else collect  #00f star,star has: #f00 color,collect  #f00 star,star has: #008000 color,collect  #008000 star,collect  #00f star,jump [object Object],move left [object Object],jump [object Object],move right [object Object],jump [object Object],move left [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam left,use laser beam [object Object] shoot beam left,shoot beam left,repeat 5 times do move left [object Object],move left [object Object],if star has: #008000 color do collect  #008000 star,star has: #008000 color,collect  #008000 star\n\n', 14, 1, 1700, 145, 0, ' START [object Object],repeat 6 times do jump [object Object],jump [object Object],move right [object Object],if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon,star has: #f00 color,if star has balloon on top do jump and collect  #f00 balloon,star has balloon on top,jump and collect  #f00 balloon,collect  #f00 star,star has: #008000 color,if star has balloon on top do jump and collect  #008000 balloon,star has balloon on top,jump and collect  #008000 balloon,collect  #008000 star,jump [object Object],move left [object Object],use laser beam [object Object] shoot beam left,shoot beam left,repeat 5 times do move left [object Object],move left [object Object],if star has: #00f color do collect  #00f star,star has: #00f color,collect  #00f star\n\n', 15, 1, 1970, 294, 3, ' START [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],do something,jump [object Object],move right [object Object],repeat 6 times do jump [object Object],jump [object Object],move left [object Object],do something,Method name:  do something  if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon else if star has balloon on top do jump and collect  #00f balloon,if star has: #f00 color do if star has balloon on top do jump and collect  #f00 balloon else if star has: #008000 color do if star has balloon on top do jump and collect  #008000 balloon else if star has balloon on top do jump and collect  #00f balloon,star has: #f00 color,if star has balloon on top do jump and collect  #f00 balloon,star has balloon on top,jump and collect  #f00 balloon,collect  #f00 star,star has: #008000 color,if star has balloon on top do jump and collect  #008000 balloon,star has balloon on top,jump and collect  #008000 balloon,collect  #008000 star,if star has balloon on top do jump and collect  #00f balloon,star has balloon on top,jump and collect  #00f balloon,collect  #00f star\n\n', 20, 2360, 110, 0, ' Method name:  do something  use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 5 times do move right [object Object],move right [object Object],START [object Object],do something,do something2,do something,do something2,do something,Method name:  do something2  jump [object Object],jump [object Object],repeat 6 times do move left [object Object],move left [object Object],jump [object Object],move right [object Object]\n\n', 29, 1, 68, 0, ' START [object Object],set password to 2019,2019,open door with password: password,repeat 3 times do move right [object Object],move right [object Object],repeat 2 times do jump [object Object],jump [object Object],move left [object Object],jump [object Object],move right [object Object],repeat until wall is broken do use laser beam [object Object] shoot beam right,use laser beam [object Object] shoot beam right,shoot beam right,repeat 3 times do move right [object Object],move right [object Object]\n\n', 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1),
('Anna', '202cb962ac59075b964b07152d234b70', 'girl', 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 100, 1, 2, 4, 19, 1, ' START [object Object],move left [object Object]\n\nSTART [object Object],move left [object Object],move left [object Object],move right [object Object],move right [object Object],move right [object Object],move right [object Object]\n\n', 5, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, '', 0, 0, 0, 0, '', 0, 0, 0, 0, '', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
