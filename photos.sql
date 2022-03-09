-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 09 mars 2022 kl 16:29
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `photos`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `album`
--

INSERT INTO `album` (`id`, `title`, `user_id`) VALUES
(2, 'cats', 3),
(3, 'Captain Korea', 5),
(4, 'Cute Cats', 6);

-- --------------------------------------------------------

--
-- Tabellstruktur `album_photo`
--

CREATE TABLE `album_photo` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `album_photo`
--

INSERT INTO `album_photo` (`id`, `album_id`, `photo_id`) VALUES
(1, 3, 5),
(2, 3, 4),
(3, 3, 6),
(4, 4, 7);

-- --------------------------------------------------------

--
-- Tabellstruktur `photo`
--

CREATE TABLE `photo` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(4, 'kitten', 'http://www.hej.se', NULL, 5),
(5, 'Pink Wonho', 'https://lastfm.freetls.fastly.net/i/u/770x0/32744de2f5fc2dcf41df32946241eaea.jpg#32744de2f5fc2dcf41df32946241eaea', 'What a cutie', 5),
(6, 'Wonho debut', 'https://static.wikia.nocookie.net/monstax/images/2/2e/Wonho_Highline_Entertainment_introduction_photo_%281%29.png/revision/latest?cb=20200411064451', 'Wonho debut photo', 5),
(7, 'An orange cat', 'https://www.pexels.com/sv-se/foto/husdjur-pals-ung-staende-1560424/', 'A sleepy orange cat', 6),
(8, 'Meow', 'https://www.pexels.com/sv-se/foto/djur-sot-pals-katter-3616232/', 'Peek a boo', 6);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(3, 'johanna@jönsson.se', '$2b$10$afym57h3tBd/3eUYLmd6iOOmDZq3bgklSJ94FqPr1MexAWt5xQxGy', 'Johanna', 'Jönsson'),
(5, 'elin@mejl.se', '$2b$10$SnxlJLHiKoDHw/j8Myiu8eUZG2InesrK0AJyV7qQfUgqqa/zNqThm', 'Elin', 'Ahlgren'),
(6, 'stevie@mejl.se', '$2b$10$ptCCl/acv3T1jNoqTUhrF.WwmD6fZZXRFbb64xYKmlsEeOF7ZI9.6', 'Stevie', 'Katt');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `album_photo`
--
ALTER TABLE `album_photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Index för tabell `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `album_photo`
--
ALTER TABLE `album_photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restriktioner för tabell `album_photo`
--
ALTER TABLE `album_photo`
  ADD CONSTRAINT `album_photo_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `album_photo_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`id`);

--
-- Restriktioner för tabell `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
