-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 12:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_projeto`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `morada` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telemovel` varchar(15) NOT NULL,
  `image_profile` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `morada`, `email`, `telemovel`, `image_profile`) VALUES
(1, 'Nuno Mansilhas', 'Rua dos Castanheiros, n89', 'mansilhas@gmail.com', '913477098', 'img\\perfil\\1718238256746.jpg'),
(2, 'Cliente 2', 'Morada 2', 'cliente2@example.com', '922222222', ''),
(40, 'Nuno Mansilhas', 'wefqef', 'mansilhas951_1996@hotmail.com', '123451212121267', 'img/perfil/1718284583007.jpg'),
(41, 'João Silva', 'rgh', 'xgandhy411@gmail.com', '232323', ''),
(424, 'Joao', 'dfsdf', 'mansilhas411@gmail.com', '343233333', 'img/perfil/1721839136593.png');

-- --------------------------------------------------------

--
-- Table structure for table `dados_empressa`
--

CREATE TABLE `dados_empressa` (
  `id` int(11) NOT NULL,
  `contribuinte` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dados_empressa`
--

INSERT INTO `dados_empressa` (`id`, `contribuinte`, `endereco`, `cidade`, `telefone`, `email`) VALUES
(1, '100 100 100', 'Rua do IPVC', 'ESTG ESTG ESTG ', '888 888 888', 'ISTOEUMTESTME@EMIL.COM');

-- --------------------------------------------------------

--
-- Table structure for table `doacoes`
--

CREATE TABLE `doacoes` (
  `ID` int(11) NOT NULL,
  `ProdutoID` varchar(150) DEFAULT NULL,
  `ClienteID` int(11) DEFAULT NULL,
  `Quantidade` int(11) DEFAULT NULL,
  `DataDoacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doacoes`
--

INSERT INTO `doacoes` (`ID`, `ProdutoID`, `ClienteID`, `Quantidade`, `DataDoacao`) VALUES
(1, 'PA001', 1, 10, '2024-07-01'),
(2, 'PA001', 2, 5, '2024-07-02'),
(3, 'PA002', 2, 15, '2024-07-03'),
(4, 'PA002', 2, 8, '2024-07-04'),
(5, 'PA003', 1, 20, '2024-07-05'),
(6, 'PA003', 2, 10, '2024-07-06'),
(7, 'PA004', 2, 25, '2024-07-07'),
(8, 'PA004', 2, 12, '2024-07-08'),
(9, 'PA005', 1, 30, '2024-07-09'),
(10, 'PA005', 2, 15, '2024-07-10'),
(11, 'PA006', 2, 35, '2024-07-11'),
(12, 'PA006', 2, 18, '2024-07-12'),
(13, 'PA007', 1, 40, '2024-07-13'),
(14, 'PA007', 2, 20, '2024-07-14'),
(15, 'PA008', 2, 45, '2024-07-15'),
(16, 'PA008', 2, 22, '2024-07-16'),
(17, 'PA009', 1, 50, '2024-07-17'),
(18, 'PA009', 2, 25, '2024-07-18'),
(19, 'PA010', 2, 55, '2024-07-19'),
(20, 'PA010', 2, 28, '2024-07-20'),
(21, 'PA011', 1, 60, '2024-07-21'),
(22, 'PA011', 2, 30, '2024-07-22'),
(23, 'PA012', 2, 65, '2024-07-23'),
(24, 'PA012', 2, 32, '2024-07-24'),
(25, 'PA013', 1, 70, '2024-07-25'),
(26, 'PA013', 2, 35, '2024-07-26'),
(27, 'PA014', 2, 75, '2024-07-27'),
(28, 'PA014', 2, 38, '2024-07-28'),
(29, 'PA015', 1, 80, '2024-07-29'),
(30, 'PA015', 2, 40, '2024-07-30'),
(31, 'PA016', 2, 85, '2024-07-31'),
(32, 'PA016', 2, 42, '2024-08-01'),
(33, 'PA017', 1, 90, '2024-08-02'),
(34, 'PA017', 2, 45, '2024-08-03'),
(35, 'PA018', 2, 95, '2024-08-04'),
(36, 'PA018', 2, 48, '2024-08-05'),
(37, 'PA019', 1, 100, '2024-08-06'),
(38, 'PA019', 2, 50, '2024-08-07'),
(39, 'PA020', 2, 105, '2024-08-08'),
(40, 'PA020', 2, 52, '2024-08-09'),
(41, 'PA021', 1, 110, '2024-08-10'),
(42, 'PA021', 2, 55, '2024-08-11'),
(43, 'PA022', 2, 115, '2024-08-12'),
(44, 'PA022', 2, 58, '2024-08-13'),
(45, 'PA023', 1, 120, '2024-08-14'),
(46, 'PA023', 2, 60, '2024-08-15'),
(47, 'PA024', 2, 125, '2024-08-16'),
(48, 'PA024', 2, 62, '2024-08-17'),
(49, 'PA025', 1, 130, '2024-08-18'),
(50, 'PA025', 2, 65, '2024-08-19'),
(51, 'PA026', 2, 135, '2024-08-20'),
(52, 'PA026', 2, 68, '2024-08-21'),
(53, 'PA027', 1, 140, '2024-08-22'),
(54, 'PA027', 2, 70, '2024-08-23'),
(55, 'PA028', 2, 145, '2024-08-24'),
(56, 'PA028', 2, 72, '2024-08-25'),
(57, 'PA029', 1, 150, '2024-08-26'),
(58, 'PA029', 2, 75, '2024-08-27'),
(59, 'PA030', 2, 155, '2024-08-28'),
(60, 'PA030', 2, 78, '2024-08-29'),
(61, 'PA031', 1, 160, '2024-08-30'),
(62, 'PA031', 2, 80, '2024-08-31'),
(63, 'PA032', 2, 165, '2024-09-01'),
(64, 'PA032', 2, 82, '2024-09-02'),
(65, 'PA033', 1, 170, '2024-09-03'),
(66, 'PA033', 2, 85, '2024-09-04'),
(67, 'PA034', 2, 175, '2024-09-05'),
(68, 'PA034', 2, 88, '2024-09-06'),
(69, 'PA035', 1, 180, '2024-09-07'),
(70, 'PA035', 2, 90, '2024-09-08'),
(71, 'PA036', 2, 185, '2024-09-09'),
(72, 'PA036', 2, 92, '2024-09-10'),
(73, 'PA037', 1, 190, '2024-09-11'),
(74, 'PA037', 2, 95, '2024-09-12'),
(75, 'PA038', 2, 195, '2024-09-13'),
(76, 'PA038', 2, 98, '2024-09-14'),
(77, 'PA039', 1, 200, '2024-09-15'),
(78, 'PA039', 2, 100, '2024-09-16'),
(79, 'PA040', 2, 205, '2024-09-17'),
(80, 'PA040', 2, 102, '2024-09-18'),
(81, 'PA041', 1, 210, '2024-09-19'),
(82, 'PA041', 2, 105, '2024-09-20'),
(83, 'PA042', 2, 215, '2024-09-21'),
(84, 'PA042', 2, 108, '2024-09-22'),
(85, 'PA043', 1, 220, '2024-09-23'),
(86, 'PA043', 2, 110, '2024-09-24'),
(87, 'PA044', 2, 225, '2024-09-25'),
(88, 'PA044', 2, 112, '2024-09-26'),
(89, 'PA045', 1, 230, '2024-09-27'),
(90, 'PA045', 2, 115, '2024-09-28'),
(91, 'PA046', 2, 235, '2024-09-29'),
(92, 'PA046', 2, 118, '2024-09-30'),
(93, 'PA047', 1, 240, '2024-10-01'),
(94, 'PA047', 2, 120, '2024-10-02'),
(95, 'PA048', 2, 245, '2024-10-03'),
(96, 'PA048', 2, 122, '2024-10-04'),
(97, 'PA049', 1, 250, '2024-10-05'),
(98, 'PA049', 2, 125, '2024-10-06'),
(99, 'PA050', 2, 255, '2024-10-07'),
(100, 'PA050', 2, 128, '2024-10-08'),
(101, 'APCVC555', 424, 5, '2024-07-24'),
(102, 'PA007', 41, 2147483647, '2024-08-01');

-- --------------------------------------------------------

--
-- Table structure for table `funcionarios`
--

CREATE TABLE `funcionarios` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `username` varchar(150) NOT NULL,
  `profileImg` varchar(150) DEFAULT NULL,
  `Cargo` enum('Administrador','Gestor','Assistente') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `funcionarios`
--

INSERT INTO `funcionarios` (`ID`, `Nome`, `username`, `profileImg`, `Cargo`, `Email`, `Senha`) VALUES
(1, 'Funcionario 1', 'user1', 'img1.jpg', 'Administrador', 'func1@example.com', 'senha1'),
(2, 'Marta Rodrigues', 'martarodrigues', 'img/profileimg1.png', 'Gestor', 'marta@example.com', 'password456'),
(3, 'Nuno Mansilhas', 'nunomansilhas', 'img/profileimg1.png', 'Administrador', 'Nuno@example.com', '$2b$10$3jt91pinI7cx8oS1b2d8nu.LafnH4WIk3.TiWsJlbjCwogdq7am72'),
(4, 'Funcionario 4', 'user4', 'img4.jpg', 'Assistente', 'func4@example.com', 'senha4'),
(38, 'João222 Silva111111111111', 'admin', '', 'Gestor', 'mansilhas951_1996@hotmail.com', '$2b$10$n/rL6iRx3miASCgPT2l0kO0IQGek2Ipl1xoV8.ruNM47K8RUA9LfO'),
(40, 'João Silva', 'joao.silva11', 'img\\perfil\\1718207548030-353175653-1_XBctk0GJ9Qq5zPjk2nhXig.jpg', 'Assistente', 'joao.silva@example.com', 'ws');

-- --------------------------------------------------------

--
-- Table structure for table `imagensprodutosdeapoio`
--

CREATE TABLE `imagensprodutosdeapoio` (
  `id` int(11) NOT NULL,
  `idProduto` varchar(150) NOT NULL,
  `imageUrl` varchar(150) NOT NULL,
  `mainImg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `imagensprodutosdeapoio`
--

INSERT INTO `imagensprodutosdeapoio` (`id`, `idProduto`, `imageUrl`, `mainImg`) VALUES
(233, 'APCVC001', 'img/produtos/1717798037061-hhVhVHlGNsRlF7I.jpg', 0),
(235, 'APCVC001', 'img/produtos/1718314673167-4bCOgFcE3bF4dGa.jpg', 0),
(236, 'APCVC001', 'img/produtos/1718315028610-4lDbOwgPhtiCutX.jpg', 0),
(237, 'APCVC001', 'img/produtos/1718315056419-cregooMO5eXOy8e.jpg', 0),
(239, 'APCVC122', 'img/produtos/1721834902133-chtsPzTAjCI6ogO.png', 0),
(241, 'PA005', 'img/produtos/1722286302460-XdqURvzvC2NKR0B.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `movimentacoesinventario`
--

CREATE TABLE `movimentacoesinventario` (
  `ID` int(11) NOT NULL,
  `ProdutoDeApoioID` varchar(150) NOT NULL,
  `TipoMovimentacao` enum('Entrada','Saída') NOT NULL,
  `Quantidade` int(11) NOT NULL,
  `DataMovimentacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `DataEntrega` datetime NOT NULL DEFAULT current_timestamp(),
  `FuncionarioID` int(11) NOT NULL,
  `ClienteID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movimentacoesinventario`
--

INSERT INTO `movimentacoesinventario` (`ID`, `ProdutoDeApoioID`, `TipoMovimentacao`, `Quantidade`, `DataMovimentacao`, `DataEntrega`, `FuncionarioID`, `ClienteID`) VALUES
(43, 'APCVC555', 'Entrada', 5, '2024-07-23 23:00:00', '2024-07-30 00:00:00', 3, 41),
(47, 'PA024', 'Entrada', 125, '2024-07-24 16:32:21', '2024-09-16 14:00:00', 3, 3),
(70, 'PA035', 'Entrada', 90, '2024-07-24 16:32:21', '2024-10-09 00:00:00', 2, 2),
(102, 'PA007', 'Entrada', 565656, '2024-07-26 23:00:00', '2024-08-02 00:00:00', 3, 41),
(104, 'APCVC555', 'Entrada', 3, '2024-07-28 23:00:00', '2024-07-28 00:00:00', 3, 1),
(105, 'PA006', 'Entrada', 1, '2024-07-28 23:00:00', '2025-02-28 00:00:00', 3, 2),
(106, 'PA008', 'Entrada', 7, '2024-07-28 23:00:00', '2024-07-29 00:00:00', 3, 424),
(109, 'APCVC122', 'Entrada', 12, '2024-07-28 23:00:00', '2024-09-05 00:00:00', 3, 1),
(114, 'PA001', 'Entrada', 16, '2024-07-28 23:00:00', '2024-12-26 00:00:00', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL,
  `id_utilizador` int(11) DEFAULT NULL,
  `tipo_acao` varchar(255) DEFAULT NULL,
  `descricao_acao` text DEFAULT NULL,
  `data_acao` timestamp NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notificacoes`
--

INSERT INTO `notificacoes` (`id`, `id_utilizador`, `tipo_acao`, `descricao_acao`, `data_acao`, `status`) VALUES
(22, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:30:00', 'Login'),
(23, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:34:21', 'Login'),
(24, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:36:51', 'Login'),
(25, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:41:40', 'Login'),
(26, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:43:33', 'Login'),
(27, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:45:59', 'Login'),
(28, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:46:42', 'Login'),
(29, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:47:42', 'Login'),
(30, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 17:51:34', 'Login'),
(31, 1, 'Adicionado', 'Funcionario 1 Adicionou um novo Produto de Apoio (45trefd)', '2024-06-04 17:51:41', 'Adicionado'),
(32, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:04:06', 'Login'),
(33, 1, 'Adicionado', 'Funcionario 1 Adicionou um novo Produto de Apoio (testetes)', '2024-06-04 18:04:13', 'Adicionado'),
(34, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:06:30', 'Login'),
(35, 1, 'Adicionado', 'Funcionario 1 Adicionou um novo Produto de Apoio (testsetsetse)', '2024-06-04 18:06:45', 'Adicionado'),
(36, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:09:08', 'Login'),
(37, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:09:51', 'Login'),
(38, 1, 'Adicionado', 'Funcionario 1 Adicionou um novo Produto de Apoio (e23t23t23t32)', '2024-06-04 18:10:08', 'Adicionado'),
(39, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:12:24', 'Login'),
(40, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:13:46', 'Login'),
(41, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:15:31', 'Login'),
(42, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:18:38', 'Login'),
(43, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:19:10', 'Login'),
(44, NULL, 'Adicionado', 'Funcionario undefined Adicionou um novo Produto de Apoio (qwer231r23r1)', '2024-06-04 18:19:22', 'Adicionado'),
(45, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:23:12', 'Login'),
(46, NULL, 'Adicionado', 'Funcionario undefined Adicionou um novo Produto de Apoio (undefined)', '2024-06-04 18:23:24', 'Adicionado'),
(47, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:24:46', 'Login'),
(48, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:27:33', 'Login'),
(49, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:28:28', 'Login'),
(50, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:29:04', 'Login'),
(51, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:32:20', 'Login'),
(52, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (1)', '2024-06-04 18:32:25', 'Adicionado'),
(53, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:33:26', 'Login'),
(54, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-04 18:36:11', 'Login'),
(55, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (12341235)', '2024-06-04 18:36:21', 'Adicionado'),
(56, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 19:55:09', 'Login'),
(57, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (234123ewqs)', '2024-06-05 19:55:21', 'Excluído'),
(58, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (12341235)', '2024-06-05 19:56:27', 'Excluído'),
(59, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (12d12d)', '2024-06-05 19:56:29', 'Excluído'),
(60, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (testsetsetse)', '2024-06-05 19:56:45', 'Excluído'),
(61, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (testetes)', '2024-06-05 19:57:15', 'Excluído'),
(62, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (54wergstdfxbvc)', '2024-06-05 19:57:17', 'Excluído'),
(63, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (qr213ewq)', '2024-06-05 19:57:18', 'Excluído'),
(64, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (fqwefqwef)', '2024-06-05 19:57:20', 'Excluído'),
(65, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (sdasdas)', '2024-06-05 19:57:22', 'Excluído'),
(66, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (34ewds)', '2024-06-05 19:57:24', 'Excluído'),
(67, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste 134)', '2024-06-05 20:18:28', 'Adicionado'),
(68, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 20:42:40', 'Login'),
(69, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 20:49:03', 'Login'),
(70, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:23:57', 'Login'),
(71, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:24:56', 'Login'),
(72, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:25:27', 'Login'),
(73, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:28:57', 'Login'),
(74, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:29:29', 'Login'),
(75, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:34:01', 'Login'),
(76, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:41:16', 'Login'),
(77, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:42:00', 'Login'),
(78, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:44:33', 'Login'),
(79, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:47:10', 'Login'),
(80, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:48:07', 'Login'),
(81, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:49:58', 'Login'),
(82, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:57:04', 'Login'),
(83, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 21:57:34', 'Login'),
(84, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:00:21', 'Login'),
(85, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:02:39', 'Login'),
(86, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:03:00', 'Login'),
(87, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:04:36', 'Login'),
(88, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:05:19', 'Login'),
(89, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:06:06', 'Login'),
(90, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:06:34', 'Login'),
(91, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:07:40', 'Login'),
(92, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:09:08', 'Login'),
(93, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:09:31', 'Login'),
(94, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:11:07', 'Login'),
(95, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:13:12', 'Login'),
(96, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:28:43', 'Login'),
(97, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 22:29:57', 'Login'),
(98, 6, 'Login', 'Utilizador Marta Arcanjo fez login na plataforma', '2024-06-05 22:52:55', 'Login'),
(99, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 23:05:31', 'Login'),
(100, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 23:12:20', 'Login'),
(101, 6, 'Login', 'Utilizador Marta Arcanjo fez login na plataforma', '2024-06-05 23:47:46', 'Login'),
(102, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (dsfasdf)', '2024-06-05 23:48:46', 'Adicionado'),
(103, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (dsfasdf)', '2024-06-05 23:49:00', 'Excluído'),
(104, 6, 'Login', 'Utilizador Marta Arcanjo fez login na plataforma', '2024-06-05 23:59:26', 'Login'),
(105, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-05 23:59:36', 'Login'),
(106, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 00:00:02', 'Login'),
(107, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 00:00:22', 'Login'),
(108, 6, 'Login', 'Utilizador Marta Arcanjo fez login na plataforma', '2024-06-06 00:33:44', 'Login'),
(109, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 11:37:16', 'Login'),
(110, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:25:01', 'Login'),
(111, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:27:29', 'Login'),
(112, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:31:50', 'Login'),
(113, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:32:08', 'Login'),
(114, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:53:31', 'Login'),
(115, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 12:58:39', 'Login'),
(116, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:00:52', 'Login'),
(117, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:03:01', 'Login'),
(118, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:04:11', 'Login'),
(119, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:05:10', 'Login'),
(120, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:06:44', 'Login'),
(121, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:07:08', 'Login'),
(122, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:35:42', 'Login'),
(123, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:39:06', 'Login'),
(124, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:40:03', 'Login'),
(125, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:40:31', 'Login'),
(126, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:40:58', 'Login'),
(127, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:41:25', 'Login'),
(128, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:41:58', 'Login'),
(129, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:48:19', 'Login'),
(130, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:50:00', 'Login'),
(131, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:50:58', 'Login'),
(132, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:53:17', 'Login'),
(133, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:54:42', 'Login'),
(134, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 13:55:03', 'Login'),
(135, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:12:02', 'Login'),
(136, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (wefwre)', '2024-06-06 14:12:19', 'Adicionado'),
(137, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:22:07', 'Login'),
(138, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:45:50', 'Login'),
(139, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:46:30', 'Login'),
(140, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:50:47', 'Login'),
(141, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:51:18', 'Login'),
(142, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:51:54', 'Login'),
(143, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:53:54', 'Login'),
(144, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:54:33', 'Login'),
(145, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:54:51', 'Login'),
(146, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:55:10', 'Login'),
(147, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:57:52', 'Login'),
(148, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 14:59:18', 'Login'),
(149, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 15:21:59', 'Login'),
(150, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 15:22:14', 'Login'),
(151, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 15:24:22', 'Login'),
(152, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (45refd)', '2024-06-06 16:07:46', 'Adicionado'),
(153, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (er)', '2024-06-06 16:10:46', 'Adicionado'),
(154, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (3333)', '2024-06-06 16:11:28', 'Adicionado'),
(155, 3, 'Excluído', 'Funcionario excluiu o Produto de Apoio (Teste 134)', '2024-06-06 16:47:57', 'Excluído'),
(156, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 16:48:52', 'Login'),
(157, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (1341)', '2024-06-06 16:49:05', 'Adicionado'),
(158, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 16:56:03', 'Login'),
(159, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (1313)', '2024-06-06 16:56:08', 'Adicionado'),
(160, 3, 'Eliminado', 'Funcionario excluiu o Produto de Apoio (1313)', '2024-06-06 17:10:18', 'Eliminado'),
(161, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:11:59', 'Login'),
(162, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:13:48', 'Login'),
(163, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (34we)', '2024-06-06 17:14:03', 'Adicionado'),
(164, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:14:14', 'Login'),
(165, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:15:37', 'Login'),
(166, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:16:13', 'Login'),
(167, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:16:38', 'Login'),
(168, 3, 'Eliminado', 'Eliminou o Produto de Apoio (34we)', '2024-06-06 17:16:43', 'Eliminado'),
(169, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (13)', '2024-06-06 17:16:52', 'Adicionado'),
(170, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:21:49', 'Login'),
(171, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:34:31', 'Login'),
(172, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:34:51', 'Login'),
(173, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:35:45', 'Login'),
(174, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:36:22', 'Login'),
(175, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:36:35', 'Login'),
(176, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:37:22', 'Login'),
(177, 3, 'Eliminado', 'Eliminou o Produto de Apoio (13)', '2024-06-06 17:37:27', 'Eliminado'),
(178, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:39:11', 'Login'),
(179, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (ew)', '2024-06-06 17:39:18', 'Adicionado'),
(180, 3, 'Eliminado', 'Eliminou o Produto de Apoio (ew)', '2024-06-06 17:39:23', 'Eliminado'),
(181, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:39:48', 'Login'),
(182, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:40:14', 'Login'),
(183, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (54wrestdf)', '2024-06-06 17:40:20', 'Adicionado'),
(184, 3, 'Eliminado', 'Eliminou o Produto de Apoio (54wrestdf)', '2024-06-06 17:40:26', 'Eliminado'),
(185, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:41:15', 'Login'),
(186, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (fd)', '2024-06-06 17:41:20', 'Adicionado'),
(187, 3, 'Eliminado', 'Eliminou o Produto de Apoio (fd)', '2024-06-06 17:41:23', 'Eliminado'),
(188, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (1234134)', '2024-06-06 17:41:40', 'Adicionado'),
(189, 3, 'Eliminado', 'Eliminou o Produto de Apoio (1234134)', '2024-06-06 17:41:43', 'Eliminado'),
(190, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 17:46:17', 'Login'),
(191, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 19:40:09', 'Login'),
(192, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (342fredf)', '2024-06-06 19:40:35', 'Adicionado'),
(193, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 19:43:29', 'Login'),
(194, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 19:44:16', 'Login'),
(195, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 19:45:20', 'Login'),
(196, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 19:46:25', 'Login'),
(197, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 21:38:13', 'Login'),
(198, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 21:39:26', 'Login'),
(199, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 21:39:59', 'Login'),
(200, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 21:42:19', 'Login'),
(201, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 21:46:17', 'Login'),
(202, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:08:18', 'Login'),
(203, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:10:15', 'Login'),
(204, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:10:38', 'Login'),
(205, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:51:47', 'Login'),
(206, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:52:22', 'Login'),
(207, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:54:42', 'Login'),
(208, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:55:50', 'Login'),
(209, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:57:03', 'Login'),
(210, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:57:28', 'Login'),
(211, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 22:59:39', 'Login'),
(212, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:00:02', 'Login'),
(213, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:06:15', 'Login'),
(214, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:07:23', 'Login'),
(215, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:08:36', 'Login'),
(216, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:09:59', 'Login'),
(217, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:10:40', 'Login'),
(218, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:11:02', 'Login'),
(219, 3, 'Eliminado', 'Eliminou o Produto de Apoio (342fredf)', '2024-06-06 23:13:56', 'Eliminado'),
(220, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste)', '2024-06-06 23:37:24', 'Adicionado'),
(221, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:38:12', 'Login'),
(222, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:38:26', 'Login'),
(223, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:40:36', 'Login'),
(224, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:45:59', 'Login'),
(225, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:46:52', 'Login'),
(226, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:47:28', 'Login'),
(227, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:47:54', 'Login'),
(228, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:49:12', 'Login'),
(229, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:51:14', 'Login'),
(230, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:52:07', 'Login'),
(231, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:52:31', 'Login'),
(232, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:53:06', 'Login'),
(233, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:57:31', 'Login'),
(234, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (3)', '2024-06-06 23:57:40', 'Adicionado'),
(235, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (34ewd)', '2024-06-06 23:58:15', 'Adicionado'),
(236, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:59:03', 'Login'),
(237, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-06 23:59:19', 'Login'),
(238, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (twertwert)', '2024-06-06 23:59:28', 'Adicionado'),
(239, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:01:22', 'Login'),
(240, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (sfd)', '2024-06-07 00:01:30', 'Adicionado'),
(241, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:02:55', 'Login'),
(242, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (edf)', '2024-06-07 00:03:03', 'Adicionado'),
(243, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (fggd)', '2024-06-07 00:03:16', 'Adicionado'),
(244, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:04:14', 'Login'),
(245, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (sdxc)', '2024-06-07 00:04:23', 'Adicionado'),
(246, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:05:58', 'Login'),
(247, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (refd)', '2024-06-07 00:06:09', 'Adicionado'),
(248, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:06:35', 'Login'),
(249, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (erggwrgwerg)', '2024-06-07 00:06:42', 'Adicionado'),
(250, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:08:09', 'Login'),
(251, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (dfgh)', '2024-06-07 00:08:21', 'Adicionado'),
(252, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (asdfasdf)', '2024-06-07 00:08:34', 'Adicionado'),
(253, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:09:45', 'Login'),
(254, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:11:22', 'Login'),
(255, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:12:47', 'Login'),
(256, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:13:25', 'Login'),
(257, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (ghjk)', '2024-06-07 00:13:34', 'Adicionado'),
(258, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:14:52', 'Login'),
(259, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (GFDHDFGH)', '2024-06-07 00:15:05', 'Adicionado'),
(260, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:15:54', 'Login'),
(261, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (GHJKGH)', '2024-06-07 00:16:02', 'Adicionado'),
(262, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:17:01', 'Login'),
(263, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:24:43', 'Login'),
(264, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (asdfas)', '2024-06-07 00:24:55', 'Adicionado'),
(265, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:50:01', 'Login'),
(266, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (fdxc)', '2024-06-07 00:50:09', 'Adicionado'),
(267, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:50:52', 'Login'),
(268, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:52:13', 'Login'),
(269, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (54ytrf)', '2024-06-07 00:52:25', 'Adicionado'),
(270, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (65ty)', '2024-06-07 00:54:05', 'Adicionado'),
(271, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:54:36', 'Login'),
(272, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (54re)', '2024-06-07 00:54:44', 'Adicionado'),
(273, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:55:13', 'Login'),
(274, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 00:58:27', 'Login'),
(275, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (sdfgs)', '2024-06-07 00:58:34', 'Adicionado'),
(276, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:01:01', 'Login'),
(277, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (56etydgf)', '2024-06-07 01:01:10', 'Adicionado'),
(278, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (657yt)', '2024-06-07 01:01:24', 'Adicionado'),
(279, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:01:44', 'Login'),
(280, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:02:24', 'Login'),
(281, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (ewr)', '2024-06-07 01:02:32', 'Adicionado'),
(282, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:05:00', 'Login'),
(283, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:07:46', 'Login'),
(284, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:08:44', 'Login'),
(285, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:09:39', 'Login'),
(286, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (56ertd)', '2024-06-07 01:09:47', 'Adicionado'),
(287, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:15:02', 'Login'),
(288, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:16:03', 'Login'),
(289, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (65rtg)', '2024-06-07 01:16:12', 'Adicionado'),
(290, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:19:15', 'Login'),
(291, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (56ERTD)', '2024-06-07 01:19:22', 'Adicionado'),
(292, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (5E6YTDG)', '2024-06-07 01:19:39', 'Adicionado'),
(293, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 01:21:01', 'Login'),
(294, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (45RE)', '2024-06-07 01:21:11', 'Adicionado'),
(295, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 11:23:01', 'Login'),
(296, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (56tyr)', '2024-06-07 11:23:11', 'Adicionado'),
(297, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste)', '2024-06-07 11:27:03', 'Adicionado'),
(298, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 11:28:18', 'Login'),
(299, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Teste)', '2024-06-07 11:30:07', 'Eliminado'),
(300, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (TES)', '2024-06-07 11:30:18', 'Adicionado'),
(301, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (WE)', '2024-06-07 11:31:03', 'Adicionado'),
(302, 3, 'Eliminado', 'Eliminou o Produto de Apoio (WE)', '2024-06-07 11:31:22', 'Eliminado'),
(303, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 11:33:40', 'Login'),
(304, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (34EW)', '2024-06-07 11:33:45', 'Adicionado'),
(305, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 11:42:39', 'Login'),
(306, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (3434ew)', '2024-06-07 11:42:47', 'Adicionado'),
(307, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (3ew)', '2024-06-07 11:43:05', 'Adicionado'),
(308, 3, 'Eliminado', 'Eliminou o Produto de Apoio (3ew)', '2024-06-07 11:43:10', 'Eliminado'),
(309, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 11:43:25', 'Login'),
(310, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (yfhg)', '2024-06-07 11:43:32', 'Adicionado'),
(311, 3, 'Eliminado', 'Eliminou o Produto de Apoio (yfhg)', '2024-06-07 11:43:41', 'Eliminado'),
(312, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (teste)', '2024-06-07 15:02:54', 'Adicionado'),
(313, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:10:02', 'Login'),
(314, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:11:17', 'Login'),
(315, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:11:42', 'Login'),
(316, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:12:02', 'Login'),
(317, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:12:48', 'Login'),
(318, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:13:29', 'Login'),
(319, 3, 'Eliminado', 'Eliminou o Produto de Apoio (teste)', '2024-06-07 15:13:35', 'Eliminado'),
(320, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste)', '2024-06-07 15:13:57', 'Adicionado'),
(321, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:15:57', 'Login'),
(322, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (ewqr)', '2024-06-07 15:16:32', 'Adicionado'),
(323, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:17:47', 'Login'),
(324, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:18:11', 'Login'),
(325, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:18:29', 'Login'),
(326, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:19:08', 'Login'),
(327, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:44:19', 'Login'),
(328, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:52:50', 'Login'),
(329, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:54:43', 'Login'),
(330, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:54:59', 'Login'),
(331, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:55:23', 'Login'),
(332, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 15:56:00', 'Login'),
(333, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:01:42', 'Login'),
(334, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:02:10', 'Login'),
(335, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:04:55', 'Login'),
(336, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:05:17', 'Login'),
(337, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:05:51', 'Login'),
(338, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:06:25', 'Login'),
(339, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:20:15', 'Login'),
(340, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:24:33', 'Login'),
(341, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:25:33', 'Login'),
(342, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:27:10', 'Login'),
(343, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 16:28:16', 'Login'),
(344, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 18:52:37', 'Login'),
(345, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:23:59', 'Login'),
(346, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:28:10', 'Login'),
(347, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:29:48', 'Login'),
(348, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:48:01', 'Login'),
(349, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:48:38', 'Login'),
(350, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:49:54', 'Login'),
(351, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:50:52', 'Login'),
(352, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 19:52:49', 'Login'),
(353, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:37:35', 'Login'),
(354, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:39:45', 'Login'),
(355, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:40:44', 'Login'),
(356, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:43:06', 'Login'),
(357, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:45:02', 'Login'),
(358, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:45:27', 'Login'),
(359, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:45:59', 'Login'),
(360, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 20:46:25', 'Login'),
(361, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:03:42', 'Login'),
(362, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:07:51', 'Login'),
(363, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:08:30', 'Login'),
(364, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:09:09', 'Login'),
(365, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:22:35', 'Login'),
(366, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:27:17', 'Login'),
(367, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:28:39', 'Login'),
(368, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:40:15', 'Login'),
(369, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:44:52', 'Login'),
(370, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:47:09', 'Login'),
(371, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:55:57', 'Login'),
(372, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 21:59:30', 'Login'),
(373, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 22:00:33', 'Login'),
(374, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 22:01:59', 'Login'),
(375, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 22:02:33', 'Login'),
(376, 3, 'Eliminado', 'Eliminou o Produto de Apoio (IstoFunciona)', '2024-06-07 22:06:12', 'Eliminado'),
(377, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira de Rodas 15x50x40x03)', '2024-06-07 22:07:17', 'Adicionado'),
(378, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (BENGALA)', '2024-06-07 22:43:15', 'Adicionado'),
(379, 3, 'Eliminado', 'Eliminou o Produto de Apoio (BENGALA)', '2024-06-07 22:43:41', 'Eliminado'),
(380, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:16:12', 'Login'),
(381, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:42:24', 'Login'),
(382, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:47:36', 'Login'),
(383, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:48:15', 'Login'),
(384, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:50:33', 'Login'),
(385, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:51:40', 'Login'),
(386, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-07 23:52:56', 'Login'),
(387, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:13:19', 'Login'),
(388, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:15:29', 'Login'),
(389, 3, 'Editado', 'Editou os dados base do Produto de Apoio com o ID : (APCVC001)', '2024-06-08 00:15:39', 'Editado'),
(390, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:17:56', 'Login'),
(391, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:20:52', 'Login'),
(392, 3, 'Editado', 'Editou os dados base do Produto de Apoio com o ID : (APCVC001)', '2024-06-08 00:21:15', 'Editado'),
(393, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:22:27', 'Login'),
(394, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:23:19', 'Login'),
(395, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:23:34', 'Login'),
(396, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:38:35', 'Login'),
(397, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:40:05', 'Login'),
(398, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-08 00:54:38', 'Login'),
(399, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-10 16:30:10', 'Login'),
(400, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 14:54:39', 'Login'),
(401, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:00:41', 'Login'),
(402, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:02:55', 'Eliminado'),
(403, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:02:57', 'Eliminado'),
(404, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:05:52', 'Login'),
(405, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:06:59', 'Eliminado'),
(406, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:48:34', 'Login'),
(407, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:49:03', 'Eliminado'),
(408, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:50:08', 'Login'),
(409, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:50:16', 'Eliminado'),
(410, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:55:16', 'Login'),
(411, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:55:22', 'Eliminado'),
(412, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 15:58:22', 'Login'),
(413, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 15:58:30', 'Eliminado'),
(414, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:06:13', 'Login'),
(415, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 16:06:35', 'Eliminado'),
(416, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 16:06:42', 'Eliminado'),
(417, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 16:08:25', 'Eliminado'),
(418, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:09:56', 'Login'),
(419, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 16:10:02', 'Eliminado'),
(420, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:12:30', 'Login'),
(421, 3, 'Eliminado', 'Eliminou o beneficiário: Ana Santos', '2024-06-11 16:12:55', 'Eliminado'),
(422, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:13:56', 'Login'),
(423, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:20:20', 'Login'),
(424, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:20:47', 'Login'),
(425, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:32:42', 'Login'),
(426, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:33:16', 'Login'),
(427, 3, 'Editado', 'Editou o Beneficiário com ID:(12)', '2024-06-11 16:33:28', 'Editado'),
(428, 3, 'Editado', 'Editou o Beneficiário com ID:(12)', '2024-06-11 16:33:44', 'Editado'),
(429, 3, 'Editado', 'Editou o Beneficiário com ID:(12)', '2024-06-11 16:34:21', 'Editado'),
(430, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva12', '2024-06-11 16:34:51', 'Eliminado'),
(431, 3, 'Editado', 'Editou o Beneficiário com ID:(11)', '2024-06-11 16:34:57', 'Editado'),
(432, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva', '2024-06-11 16:36:51', 'Eliminado'),
(433, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva', '2024-06-11 16:36:54', 'Eliminado'),
(434, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:38:57', 'Login'),
(435, 3, 'Editado', 'Editou o Beneficiário com ID:(9)', '2024-06-11 16:39:06', 'Editado'),
(436, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:40:35', 'Login'),
(437, 3, 'Editado', 'Editou o Beneficiário com ID:(9)', '2024-06-11 16:40:42', 'Editado'),
(438, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva1', '2024-06-11 16:49:31', 'Eliminado'),
(439, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva', '2024-06-11 16:49:36', 'Eliminado'),
(440, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:50:15', 'Login'),
(441, 3, 'Editado', 'Editou o Beneficiário João Silva1 com ID:(8)', '2024-06-11 16:50:26', 'Editado'),
(442, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 16:51:12', 'Login'),
(443, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 17:18:47', 'Login'),
(444, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 17:50:33', 'Login'),
(445, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 17:55:20', 'Login'),
(446, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 17:58:07', 'Login'),
(447, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:03:53', 'Login'),
(448, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:07:17', 'Login'),
(449, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:14:12', 'Login'),
(450, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:29:15', 'Login'),
(451, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (teste)', '2024-06-11 18:31:36', 'Adicionado'),
(452, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:42:16', 'Login'),
(453, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 18:42:26', 'Eliminado'),
(454, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 18:42:29', 'Eliminado'),
(455, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:47:20', 'Login'),
(456, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:48:08', 'Login'),
(457, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:48:37', 'Login'),
(458, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 18:49:39', 'Login'),
(459, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:05:45', 'Login'),
(460, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:06:45', 'Login'),
(461, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:11:04', 'Login'),
(462, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:15:52', 'Login'),
(463, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:16:57', 'Login'),
(464, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(13)', '2024-06-11 21:17:06', 'Editado'),
(465, 3, 'Editado', 'Editou o Beneficiário 111111111 com ID:(13)', '2024-06-11 21:17:50', 'Editado'),
(466, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:20:44', 'Login'),
(467, 3, 'Editado', 'Editou o Beneficiário João222 Silva1111111111 com ID:(14)', '2024-06-11 21:20:54', 'Editado'),
(468, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:21:25', 'Login'),
(469, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:23:35', 'Login'),
(470, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:23:55', 'Login'),
(471, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva1', '2024-06-11 21:24:05', 'Eliminado'),
(472, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-11 21:24:09', 'Eliminado'),
(473, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-11 21:24:11', 'Eliminado'),
(474, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 21:24:14', 'Eliminado'),
(475, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 21:24:16', 'Eliminado'),
(476, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 21:24:18', 'Eliminado'),
(477, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 21:24:23', 'Eliminado'),
(478, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:27:27', 'Login'),
(479, 3, 'Editado', 'Editou o Beneficiário João Silva11111111 com ID:(25)', '2024-06-11 21:27:38', 'Editado'),
(480, 3, 'Editado', 'Editou o Beneficiário 1212 com ID:(25)', '2024-06-11 21:28:05', 'Editado'),
(481, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:29:05', 'Login'),
(482, 3, 'Editado', 'Editou o Beneficiário teste1111 com ID:(26)', '2024-06-11 21:29:17', 'Editado'),
(483, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:29:50', 'Login'),
(484, 3, 'Editado', 'Editou o Beneficiário João Silva1111 com ID:(27)', '2024-06-11 21:30:00', 'Editado'),
(485, 3, 'Editado', 'Editou o Beneficiário teste com ID:(27)', '2024-06-11 21:31:52', 'Editado'),
(486, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:34:57', 'Login'),
(487, 3, 'Editado', 'Editou o Beneficiário João Silva1111111 com ID:(28)', '2024-06-11 21:35:07', 'Editado'),
(488, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (testset)', '2024-06-11 21:36:01', 'Adicionado'),
(489, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:44:56', 'Login'),
(490, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (asdasds)', '2024-06-11 21:45:06', 'Adicionado'),
(491, 3, 'Editado', 'Editou o Beneficiário asdasds1111111111111111111111 com ID:(30)', '2024-06-11 21:45:18', 'Editado'),
(492, 3, 'Editado', 'Editou o Beneficiário asdasds1111111111111111111111 com ID:(30)', '2024-06-11 21:45:24', 'Editado');
INSERT INTO `notificacoes` (`id`, `id_utilizador`, `tipo_acao`, `descricao_acao`, `data_acao`, `status`) VALUES
(493, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:47:59', 'Login'),
(494, 3, 'Editado', 'Editou o Beneficiário asdasds111111111111111111111111 com ID:(30)', '2024-06-11 21:48:16', 'Editado'),
(495, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:50:31', 'Login'),
(496, 3, 'Editado', 'Editou o Beneficiário asdasds111111111111111111111111 com ID:(30)', '2024-06-11 21:50:43', 'Editado'),
(497, 3, 'Editado', 'Editou o Beneficiário asdasds111111111111111111111111 com ID:(30)', '2024-06-11 21:50:52', 'Editado'),
(498, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:54:25', 'Login'),
(499, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:54:44', 'Login'),
(500, 3, 'Editado', 'Editou o Beneficiário teste com ID:(25)', '2024-06-11 21:54:55', 'Editado'),
(501, 3, 'Editado', 'Editou o Beneficiário teste com ID:(25)', '2024-06-11 21:55:35', 'Editado'),
(502, 3, 'Editado', 'Editou o Beneficiário teste com ID:(25)', '2024-06-11 21:55:41', 'Editado'),
(503, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João222 Silva111111111111)', '2024-06-11 21:56:42', 'Adicionado'),
(504, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 21:59:04', 'Login'),
(505, 3, 'Editado', 'Editou o Beneficiário teste com ID:(25)', '2024-06-11 21:59:12', 'Editado'),
(506, 3, 'Editado', 'Editou o Beneficiário teste com ID:(25)', '2024-06-11 21:59:16', 'Editado'),
(507, 3, 'Editado', 'Editou o Beneficiário teste1111111111 com ID:(25)', '2024-06-11 21:59:19', 'Editado'),
(508, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-11 22:00:45', 'Eliminado'),
(509, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-11 22:00:47', 'Eliminado'),
(510, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-11 22:00:50', 'Eliminado'),
(511, 3, 'Eliminado', 'Eliminou o beneficiário: asdasds111111111111111111111111', '2024-06-11 22:01:03', 'Eliminado'),
(512, 3, 'Editado', 'Editou o Beneficiário João Silva com ID:(1)', '2024-06-11 22:02:47', 'Editado'),
(513, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:05:22', 'Login'),
(514, 3, 'Eliminado', 'Eliminou o beneficiário: teste1111111111', '2024-06-11 22:05:28', 'Eliminado'),
(515, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva111111111111', '2024-06-11 22:05:35', 'Eliminado'),
(516, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva1111111', '2024-06-11 22:05:41', 'Eliminado'),
(517, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:15:30', 'Login'),
(518, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 22:15:43', 'Eliminado'),
(519, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (teste)', '2024-06-11 22:16:06', 'Adicionado'),
(520, 3, 'Eliminado', 'Eliminou o beneficiário: teste', '2024-06-11 22:16:17', 'Eliminado'),
(521, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João222 Silva111111111111)', '2024-06-11 22:16:37', 'Adicionado'),
(522, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva111111111111', '2024-06-11 22:16:45', 'Eliminado'),
(523, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:17:26', 'Login'),
(524, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:17:55', 'Login'),
(525, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:22:53', 'Login'),
(526, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:23:23', 'Login'),
(527, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:23:44', 'Login'),
(528, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:24:15', 'Login'),
(529, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:24:34', 'Login'),
(530, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:25:10', 'Login'),
(531, 3, 'Editado', 'Editou o Beneficiário João222 Silva com ID:(22)', '2024-06-11 22:25:19', 'Editado'),
(532, 3, 'Editado', 'Editou o Beneficiário João222 Silva123451212121267111111111111111111111111 com ID:(22)', '2024-06-11 22:25:26', 'Editado'),
(533, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva123451212121267111111111111111111111111', '2024-06-11 22:26:20', 'Eliminado'),
(534, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva', '2024-06-11 22:26:23', 'Eliminado'),
(535, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:34:33', 'Login'),
(536, 3, 'Editado', 'Editou o Beneficiário João222 Silva com ID:(15)', '2024-06-11 22:36:12', 'Editado'),
(537, 3, 'Editado', 'Editou o Beneficiário João222 Silva com ID:(15)', '2024-06-11 22:36:16', 'Editado'),
(538, 3, 'Editado', 'Editou o Beneficiário João222 Silva11111111111111 com ID:(15)', '2024-06-11 22:36:19', 'Editado'),
(539, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva11111111111111', '2024-06-11 22:37:06', 'Eliminado'),
(540, 3, 'Editado', 'Editou o Beneficiário João Silva com ID:(6)', '2024-06-11 22:37:12', 'Editado'),
(541, 3, 'Editado', 'Editou o Beneficiário João Silva com ID:(6)', '2024-06-11 22:37:17', 'Editado'),
(542, 3, 'Editado', 'Editou o Beneficiário João Silva com ID:(6)', '2024-06-11 22:37:20', 'Editado'),
(543, 3, 'Editado', 'Editou o Beneficiário João Silva com ID:(6)', '2024-06-11 22:37:24', 'Editado'),
(544, 3, 'Editado', 'Editou o Beneficiário João Silva33333 com ID:(6)', '2024-06-11 22:37:29', 'Editado'),
(545, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:43:47', 'Login'),
(546, 3, 'Eliminado', 'Eliminou o beneficiário: João Silva33333', '2024-06-11 22:43:55', 'Eliminado'),
(547, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (teste)', '2024-06-11 22:44:15', 'Adicionado'),
(548, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(34)', '2024-06-11 22:44:27', 'Editado'),
(549, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-11 22:50:33', 'Login'),
(550, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(34)', '2024-06-11 22:53:56', 'Editado'),
(551, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 09:23:22', 'Login'),
(552, 3, 'Editado', 'Editou o Beneficiário Teste com ID:(34)', '2024-06-12 09:23:34', 'Editado'),
(553, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(34)', '2024-06-12 09:23:51', 'Editado'),
(554, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(34)', '2024-06-12 09:24:09', 'Editado'),
(555, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(34)', '2024-06-12 09:24:43', 'Editado'),
(556, 3, 'Eliminado', 'Eliminou o beneficiário: ', '2024-06-12 09:26:38', 'Eliminado'),
(557, 3, 'Editado', 'Editou o Beneficiário João Silva1 com ID:(1)', '2024-06-12 09:26:49', 'Editado'),
(558, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(1)', '2024-06-12 09:28:28', 'Editado'),
(559, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João222 Silva111111111111)', '2024-06-12 09:28:52', 'Adicionado'),
(560, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (teste)', '2024-06-12 09:31:37', 'Adicionado'),
(561, 3, 'Eliminado', 'Eliminou o beneficiário: teste', '2024-06-12 09:31:42', 'Eliminado'),
(562, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas com ID:(35)', '2024-06-12 09:32:03', 'Editado'),
(563, 3, 'Editado', 'Editou o Beneficiário teste com ID:(35)', '2024-06-12 09:33:48', 'Editado'),
(564, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 09:38:39', 'Login'),
(565, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(35)', '2024-06-12 09:38:48', 'Editado'),
(566, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(35)', '2024-06-12 09:38:55', 'Editado'),
(567, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(35)', '2024-06-12 09:39:20', 'Editado'),
(568, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva111111111111', '2024-06-12 09:40:20', 'Eliminado'),
(569, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João222 Silva111111111111)', '2024-06-12 09:40:29', 'Adicionado'),
(570, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva111111111111', '2024-06-12 09:40:37', 'Eliminado'),
(571, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 09:45:23', 'Login'),
(572, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João222 Silva111111111111)', '2024-06-12 09:45:41', 'Adicionado'),
(573, 3, 'Editado', 'Editou o Beneficiário João222 Silva111111111111 com ID:(38)', '2024-06-12 09:46:00', 'Editado'),
(574, 3, 'Eliminado', 'Eliminou o beneficiário: João222 Silva111111111111', '2024-06-12 09:46:07', 'Eliminado'),
(575, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas com ID:(1)', '2024-06-12 09:48:06', 'Editado'),
(576, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas1 com ID:(1)', '2024-06-12 09:48:10', 'Editado'),
(577, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas com ID:(1)', '2024-06-12 09:48:16', 'Editado'),
(578, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas com ID:(1)', '2024-06-12 09:48:16', 'Editado'),
(579, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 10:56:37', 'Login'),
(580, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 11:44:53', 'Login'),
(581, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 12:08:06', 'Login'),
(582, 3, 'Eliminado', 'Eliminou o funcionário: Marta Arcanjo', '2024-06-12 13:05:54', 'Eliminado'),
(583, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:12:54', 'Login'),
(584, 3, 'Eliminado', 'Eliminou o funcionário: Pedro Costa', '2024-06-12 13:13:03', 'Eliminado'),
(585, 3, 'Eliminado', 'Eliminou o funcionário: Pedro Costa', '2024-06-12 13:13:13', 'Eliminado'),
(586, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:30:14', 'Login'),
(587, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:40:31', 'Login'),
(588, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:41:30', 'Eliminado'),
(589, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:46:44', 'Login'),
(590, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:47:04', 'Login'),
(591, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:50:23', 'Login'),
(592, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:50:29', 'Eliminado'),
(593, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:50:32', 'Eliminado'),
(594, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:50:35', 'Eliminado'),
(595, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:50:41', 'Eliminado'),
(596, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:51:08', 'Eliminado'),
(597, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:52:36', 'Eliminado'),
(598, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:53:35', 'Login'),
(599, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:53:39', 'Eliminado'),
(600, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:53:42', 'Eliminado'),
(601, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 13:56:32', 'Eliminado'),
(602, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 13:59:59', 'Login'),
(603, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 14:03:47', 'Login'),
(604, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 14:05:09', 'Login'),
(605, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 14:08:04', 'Login'),
(606, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 14:08:16', 'Eliminado'),
(607, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 14:08:37', 'Eliminado'),
(608, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 14:08:41', 'Eliminado'),
(609, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:23:09', 'Eliminado'),
(610, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:23:16', 'Eliminado'),
(611, 3, 'Eliminado', 'Eliminou o funcionário: teste', '2024-06-12 14:23:21', 'Eliminado'),
(612, 3, 'Eliminado', 'Eliminou o funcionário: teste', '2024-06-12 14:23:25', 'Eliminado'),
(613, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:28:04', 'Eliminado'),
(614, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:28:08', 'Eliminado'),
(615, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 14:28:17', 'Eliminado'),
(616, 3, 'Eliminado', 'Eliminou o funcionário: João Silva', '2024-06-12 14:28:21', 'Eliminado'),
(617, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:29:17', 'Eliminado'),
(618, 3, 'Editado', 'Editou o Funcionário Pedro Costa1 com ID:(1)', '2024-06-12 14:33:58', 'Editado'),
(619, 3, 'Adicionado', 'Adicionou o Funcionário João222 Silva111111111111 com ID:(40)', '2024-06-12 14:38:31', 'Adicionado'),
(620, 3, 'Eliminado', 'Eliminou o funcionário: teste', '2024-06-12 14:39:24', 'Eliminado'),
(621, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:39:27', 'Eliminado'),
(622, 3, 'Eliminado', 'Eliminou o funcionário: ', '2024-06-12 14:39:30', 'Eliminado'),
(623, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:39:34', 'Eliminado'),
(624, 3, 'Eliminado', 'Eliminou o funcionário: João222 Silva111111111111', '2024-06-12 14:39:37', 'Eliminado'),
(625, 40, 'Login', 'Utilizador João Silva fez login na plataforma', '2024-06-12 14:41:59', 'Login'),
(626, 3, 'Editado', 'Editou o Funcionário João Silva1 com ID:(40)', '2024-06-12 14:43:56', 'Editado'),
(627, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:44:03', 'Editado'),
(628, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:44:08', 'Editado'),
(629, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:45:53', 'Editado'),
(630, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:45:58', 'Editado'),
(631, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:46:04', 'Editado'),
(632, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:46:14', 'Editado'),
(633, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 14:47:29', 'Login'),
(634, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:47:37', 'Editado'),
(635, 3, 'Editado', 'Editou o Funcionário João Silva12 com ID:(40)', '2024-06-12 14:47:42', 'Editado'),
(636, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 14:53:13', 'Login'),
(637, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 15:22:12', 'Login'),
(638, 3, 'Editado', 'Editou o Funcionário João Silva12222222222 com ID:(40)', '2024-06-12 15:22:27', 'Editado'),
(639, 3, 'Editado', 'Editou o Funcionário João Silva12222222222 com ID:(40)', '2024-06-12 15:22:59', 'Editado'),
(640, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 15:50:48', 'Login'),
(641, 3, 'Editado', 'Editou o Funcionário João Silva com ID:(40)', '2024-06-12 15:51:12', 'Editado'),
(642, 3, 'Editado', 'Editou o Funcionário João Silva com ID:(40)', '2024-06-12 15:51:19', 'Editado'),
(643, 3, 'Editado', 'Editou o Funcionário João Silva com ID:(40)', '2024-06-12 15:51:35', 'Editado'),
(644, 3, 'Editado', 'Editou o Funcionário João Silva com ID:(40)', '2024-06-12 15:52:18', 'Editado'),
(645, 3, 'Editado', 'Editou o Funcionário João Silva com ID:(40)', '2024-06-12 15:52:28', 'Editado'),
(646, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 16:02:36', 'Login'),
(647, 3, 'Editado', 'Alterou a senha do Funcionário João222 Silva111111111111 com ID:(38)', '2024-06-12 16:04:42', 'Editado'),
(648, 3, 'Editado', 'Alterou a senha do Funcionário João222 Silva111111111111 com ID:(38)', '2024-06-12 16:04:42', 'Editado'),
(649, 3, 'Editado', 'Editou o Funcionário João222 Silva111111111111 com ID:(38)', '2024-06-12 16:06:05', 'Editado'),
(650, 38, 'Login', 'Utilizador João222 Silva111111111111 fez login na plataforma', '2024-06-12 16:06:20', 'Login'),
(651, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-12 22:27:39', 'Login'),
(652, 3, 'Eliminado', 'Eliminou a Categoria: Bengala', '2024-06-12 22:34:44', 'Eliminado'),
(653, 3, 'Editado', 'Editou a Categoria Andaré', '2024-06-12 22:34:51', 'Editado'),
(654, 3, 'Editado', 'Editou a Categoria Cadeira de Rodas (2)', '2024-06-12 22:35:01', 'Editado'),
(655, 3, 'Criado', 'Adicionou a nova categoria: Nuno Mansilhas', '2024-06-12 23:48:23', 'Criado'),
(656, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (Marta Arcanjo)', '2024-06-12 23:57:16', 'Adicionado'),
(657, 3, 'Criado', 'Adicionou a nova categoria: CADEIRA DE RODAS', '2024-06-13 00:02:41', 'Criado'),
(658, 3, 'Criado', 'Adicionou a nova categoria: HTO WHEELS', '2024-06-13 00:02:47', 'Criado'),
(659, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste)', '2024-06-13 00:03:23', 'Adicionado'),
(660, 3, 'Editado', 'Editou a Categoria 233', '2024-06-13 00:09:16', 'Editado'),
(661, 3, 'Editado', 'Editou a Categoria 233', '2024-06-13 00:09:16', 'Editado'),
(662, 3, 'Editado', 'Editou o Beneficiário Nuno Mansilhas com ID:(1)', '2024-06-13 00:24:16', 'Editado'),
(663, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 12:49:25', 'Login'),
(664, 3, 'Eliminado', 'Eliminou o beneficiário: Marta Arcanjo', '2024-06-13 13:16:12', 'Eliminado'),
(665, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (Nuno Mansilhas)', '2024-06-13 13:16:23', 'Adicionado'),
(666, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (João Silva)', '2024-06-13 14:24:58', 'Adicionado'),
(667, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 16:35:36', 'Adicionado'),
(668, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 16:37:07', 'Adicionado'),
(669, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 16:40:27', 'Adicionado'),
(670, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 16:46:02', 'Adicionado'),
(671, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 16:47:21', 'Adicionado'),
(672, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-13 18:02:28', 'Adicionado'),
(673, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-13 18:04:01', 'Adicionado'),
(674, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC005', '2024-06-13 18:07:47', 'Adicionado'),
(675, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC006', '2024-06-13 18:08:17', 'Adicionado'),
(676, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC007', '2024-06-13 18:12:23', 'Adicionado'),
(677, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC009', '2024-06-13 18:13:58', 'Adicionado'),
(678, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC000', '2024-06-13 18:14:44', 'Adicionado'),
(679, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC010', '2024-06-13 18:15:51', 'Adicionado'),
(680, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 18:16:18', 'Login'),
(681, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC077', '2024-06-13 18:16:45', 'Adicionado'),
(682, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 18:17:58', 'Login'),
(683, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: 56565', '2024-06-13 18:19:13', 'Adicionado'),
(684, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC100', '2024-06-13 18:22:04', 'Adicionado'),
(685, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC0030', '2024-06-13 18:24:07', 'Adicionado'),
(686, 3, 'Eliminado', 'Eliminou o Produto de Apoio (0000000000000)', '2024-06-13 18:26:54', 'Eliminado'),
(687, 3, 'Eliminado', 'Eliminou o Produto de Apoio (99999999999)', '2024-06-13 18:26:56', 'Eliminado'),
(688, 3, 'Eliminado', 'Eliminou o Produto de Apoio (90)', '2024-06-13 18:26:59', 'Eliminado'),
(689, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:01', 'Eliminado'),
(690, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:03', 'Eliminado'),
(691, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:05', 'Eliminado'),
(692, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:07', 'Eliminado'),
(693, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira 6)', '2024-06-13 18:27:08', 'Eliminado'),
(694, 3, 'Eliminado', 'Eliminou o Produto de Apoio (77777777777)', '2024-06-13 18:27:10', 'Eliminado'),
(695, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:11', 'Eliminado'),
(696, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Cadeira)', '2024-06-13 18:27:13', 'Eliminado'),
(697, 3, 'Eliminado', 'Eliminou o Produto de Apoio (Bengala)', '2024-06-13 18:27:14', 'Eliminado'),
(698, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:34:31', 'Adicionado'),
(699, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira de Rodas 15x50x40x03)', '2024-06-13 21:37:53', 'Adicionado'),
(700, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:38:18', 'Adicionado'),
(701, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira de Rodas 15x50x40x03)', '2024-06-13 21:43:48', 'Adicionado'),
(702, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira de Rodas 15x50x40x03)', '2024-06-13 21:44:16', 'Adicionado'),
(703, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 21:47:38', 'Login'),
(704, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:47:59', 'Adicionado'),
(705, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:48:29', 'Adicionado'),
(706, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:49:48', 'Adicionado'),
(707, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 21:52:17', 'Login'),
(708, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC001', '2024-06-13 21:52:38', 'Adicionado'),
(709, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 22:16:47', 'Login'),
(710, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 22:24:29', 'Login'),
(711, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 23:02:30', 'Login'),
(712, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 23:03:16', 'Login'),
(713, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-13 23:05:57', 'Login'),
(714, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-14 11:01:36', 'Login'),
(715, 3, 'Editado', 'Editou o Produto de Apoio com ID:(APCVC001)', '2024-06-14 11:03:48', 'Editado'),
(716, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-14 11:16:16', 'Login'),
(717, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-06-14 15:11:47', 'Login'),
(718, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (23)', '2024-06-14 15:58:17', 'Adicionado'),
(719, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Teste2)', '2024-06-14 15:59:06', 'Adicionado'),
(720, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:00:17', 'Adicionado'),
(721, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: 323', '2024-06-14 16:05:28', 'Adicionado'),
(722, 3, 'Eliminado', 'Eliminou a doação com ID: 45', '2024-06-14 16:05:53', 'Eliminado'),
(723, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (666666666666)', '2024-06-14 16:06:10', 'Adicionado'),
(724, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:06:10', 'Adicionado'),
(725, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira)', '2024-06-14 16:11:40', 'Adicionado'),
(726, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:11:40', 'Adicionado'),
(727, 3, 'Eliminado', 'Eliminou a doação com ID: 42', '2024-06-14 16:30:18', 'Eliminado'),
(728, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira)', '2024-06-14 16:33:55', 'Adicionado'),
(729, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:33:55', 'Adicionado'),
(730, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (23452345)', '2024-06-14 16:34:55', 'Adicionado'),
(731, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:34:55', 'Adicionado'),
(732, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (qwd12341234)', '2024-06-14 16:39:05', 'Adicionado'),
(733, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (232323)', '2024-06-14 16:43:58', 'Adicionado'),
(734, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:43:58', 'Adicionado'),
(735, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (45grwetfdv)', '2024-06-14 16:45:24', 'Adicionado'),
(736, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:45:24', 'Adicionado'),
(737, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (45gg435g453g)', '2024-06-14 16:45:57', 'Adicionado'),
(738, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:45:57', 'Adicionado'),
(739, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira)', '2024-06-14 16:46:46', 'Adicionado'),
(740, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:46:46', 'Adicionado'),
(741, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (34erwds)', '2024-06-14 16:47:18', 'Adicionado'),
(742, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: undefined', '2024-06-14 16:47:18', 'Adicionado'),
(743, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (Cadeira 6)', '2024-06-14 16:48:00', 'Adicionado'),
(744, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: 232323eds', '2024-06-14 16:48:00', 'Adicionado'),
(745, 3, 'Eliminado', 'Eliminou a doação com ID: 57', '2024-06-14 16:48:43', 'Eliminado'),
(746, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-24 15:17:36', 'Login'),
(747, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-24 15:24:07', 'Login'),
(748, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (AAAAAAAAAAAA)', '2024-07-24 15:27:13', 'Adicionado'),
(749, 3, 'Eliminado', 'Eliminou o Produto de Apoio (AAAAAAAAAAAA)', '2024-07-24 15:28:07', 'Eliminado'),
(750, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (AAAAAAAAAAAA)', '2024-07-24 15:28:22', 'Adicionado'),
(751, 3, 'Adicionado', 'Adicionou 1 Imagem ao Produto de Apoio com ID:(APCVC122)', '2024-07-24 15:28:34', 'Adicionado'),
(752, 3, 'Requisição Efetuada', 'Funcionário - ID: 3 efetuou a requisição do PA - ID: APCVC122 para o Beneficiário - ID: 41', '2024-07-24 16:06:33', 'Requisição Efetuada'),
(753, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC122', '2024-07-24 16:08:21', 'Adicionado'),
(754, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-24 16:34:41', 'Login'),
(755, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Beneficiário (Joao)', '2024-07-24 16:38:56', 'Adicionado'),
(756, 3, 'Adicionado', 'Funcionario Nuno Mansilhas Adicionou um novo Produto de Apoio (bbbbbbbbbbb)', '2024-07-24 16:39:26', 'Adicionado'),
(757, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: APCVC555', '2024-07-24 16:39:26', 'Adicionado'),
(758, 3, 'Requisição Efetuada', 'Funcionário - ID: 3 efetuou a requisição do PA - ID: APCVC122 para o Beneficiário - ID: 424', '2024-07-24 16:40:12', 'Requisição Efetuada'),
(759, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 11:46:58', 'Login'),
(760, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 11:52:43', 'Login'),
(761, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 13:22:11', 'Login'),
(762, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 13:50:34', 'Login'),
(763, 3, 'Eliminado', 'Eliminou o beneficiário: Cliente 3', '2024-07-27 13:50:43', 'Eliminado'),
(764, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 21:12:39', 'Login'),
(765, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 21:18:56', 'Login'),
(766, 3, 'Artigo Devolvido', 'O artigo com ID: 43 foi devolvido com sucesso.', '2024-07-27 21:19:39', 'Artigo Devolvido'),
(767, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: PA007', '2024-07-27 21:28:21', 'Adicionado'),
(768, 3, 'Requisição Efetuada', 'Funcionário - ID: 3 efetuou a requisição do PA - ID: PA007 para o Beneficiário - ID: 41', '2024-07-27 21:28:33', 'Requisição Efetuada'),
(769, 3, 'Editado', 'Os dados da empresa foram atualizados com sucesso.', '2024-07-27 23:00:52', 'Editado'),
(770, 3, 'Editado', 'Os dados da empresa foram atualizados com sucesso.', '2024-07-27 23:01:06', 'Editado'),
(771, 3, 'Editado', 'Os dados da empresa foram atualizados com sucesso.', '2024-07-27 23:03:38', 'Editado'),
(772, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-27 23:13:19', 'Login'),
(773, 3, 'Criado', 'Adicionou a nova categoria: teste', '2024-07-27 23:15:28', 'Criado'),
(774, 3, 'Eliminado', 'Eliminou a Categoria: teste', '2024-07-27 23:15:29', 'Eliminado'),
(775, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-29 13:26:53', 'Login'),
(776, 38, 'Login', 'Utilizador João222 Silva111111111111 fez login na plataforma', '2024-07-29 13:36:41', 'Login'),
(777, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-29 13:37:45', 'Login'),
(778, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: APCVC555', '2024-07-29 19:44:00', 'Adicionado'),
(779, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA006', '2024-07-29 19:45:30', 'Adicionado'),
(780, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA008', '2024-07-29 19:46:20', 'Adicionado'),
(781, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA001', '2024-07-29 19:50:02', 'Adicionado'),
(782, 3, 'Artigo Devolvido', 'O artigo com ID: 42 foi devolvido com sucesso.', '2024-07-29 20:00:04', 'Artigo Devolvido'),
(783, 3, 'Artigo Devolvido', 'O artigo com ID: 42 foi devolvido com sucesso.', '2024-07-29 20:00:07', 'Artigo Devolvido'),
(784, 3, 'Artigo Devolvido', 'O artigo com ID: 70 foi devolvido com sucesso.', '2024-07-29 20:00:36', 'Artigo Devolvido'),
(785, 3, 'Artigo Devolvido', 'O artigo com ID: 102 foi devolvido com sucesso.', '2024-07-29 20:00:46', 'Artigo Devolvido'),
(786, 3, 'Artigo Devolvido', 'O artigo com ID: 103 foi devolvido com sucesso.', '2024-07-29 20:04:14', 'Artigo Devolvido'),
(787, 3, 'Artigo Devolvido', 'O artigo com ID: 104 foi devolvido com sucesso.', '2024-07-29 20:04:18', 'Artigo Devolvido'),
(788, 3, 'Artigo Devolvido', 'O artigo com ID: 105 foi devolvido com sucesso.', '2024-07-29 20:04:23', 'Artigo Devolvido'),
(789, 3, 'Artigo Devolvido', 'O artigo com ID: 106 foi devolvido com sucesso.', '2024-07-29 20:04:26', 'Artigo Devolvido'),
(790, 3, 'Artigo Devolvido', 'O artigo com ID: 107 foi devolvido com sucesso.', '2024-07-29 20:04:28', 'Artigo Devolvido'),
(791, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: APCVC122', '2024-07-29 20:05:04', 'Adicionado'),
(792, 3, 'Eliminado', 'Eliminou a solicitação com ID: 103', '2024-07-29 20:05:26', 'Eliminado'),
(793, 3, 'Eliminado', 'Eliminou a solicitação com ID: 107', '2024-07-29 20:05:26', 'Eliminado'),
(794, 3, 'Eliminado', 'Eliminou a solicitação com ID: 108', '2024-07-29 20:05:33', 'Eliminado'),
(795, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: APCVC122', '2024-07-29 20:05:48', 'Adicionado'),
(796, 3, 'Artigo Devolvido', 'O artigo com ID: 109 foi devolvido com sucesso.', '2024-07-29 20:05:55', 'Artigo Devolvido'),
(797, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA001', '2024-07-29 20:11:39', 'Adicionado'),
(798, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA007', '2024-07-29 20:11:53', 'Adicionado'),
(799, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: APCVC122', '2024-07-29 20:18:16', 'Adicionado'),
(800, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: APCVC555', '2024-07-29 20:19:27', 'Adicionado'),
(801, 3, 'Artigo Devolvido', 'O artigo com ID: 113 foi devolvido com sucesso.', '2024-07-29 20:31:31', 'Artigo Devolvido'),
(802, 3, 'Adicionado', 'Adicionou uma solicitação com o produto ID: PA001', '2024-07-29 20:34:08', 'Adicionado'),
(803, 3, 'Adicionado', 'Adicionou 1 Imagem ao Produto de Apoio com ID:(PA005)', '2024-07-29 20:51:42', 'Adicionado'),
(804, 3, 'Criado', 'Adicionou a nova categoria: Muletas', '2024-07-29 21:09:32', 'Criado'),
(805, 3, 'Criado', 'Adicionou a nova categoria: Categoria 1', '2024-07-29 21:09:41', 'Criado'),
(806, 3, 'Criado', 'Adicionou a nova categoria: Categoria 5', '2024-07-29 21:09:46', 'Criado'),
(807, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-29 22:26:15', 'Login'),
(808, 3, 'Eliminado', 'Eliminou 1 Imagem do Produto de Apoio com ID:(APCVC122)', '2024-07-29 22:26:51', 'Eliminado'),
(809, 3, 'Editado', 'Editou o Produto de Apoio com ID:(APCVC122)', '2024-07-29 22:26:59', 'Editado'),
(810, 3, 'Eliminado', 'Eliminou a solicitação com ID: 42', '2024-07-29 22:27:25', 'Eliminado'),
(811, 3, 'Eliminado', 'Eliminou a solicitação com ID: 113', '2024-07-29 22:27:25', 'Eliminado'),
(812, 3, 'Artigo Devolvido', 'O artigo com ID: 114 foi devolvido com sucesso.', '2024-07-29 22:27:45', 'Artigo Devolvido'),
(813, 3, 'Eliminado', 'Eliminou a Categoria: Categoria 5', '2024-07-29 22:28:40', 'Eliminado'),
(814, 3, 'Editado', 'Os dados da empresa foram atualizados com sucesso.', '2024-07-29 22:29:31', 'Editado');

-- --------------------------------------------------------

--
-- Table structure for table `produtosdeapoio`
--

CREATE TABLE `produtosdeapoio` (
  `ID` varchar(150) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Descricao` text DEFAULT NULL,
  `TipoProdutoID` int(11) NOT NULL,
  `Disponibilidade` varchar(50) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `donativo` varchar(150) DEFAULT NULL,
  `data_de_criacao` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produtosdeapoio`
--

INSERT INTO `produtosdeapoio` (`ID`, `Nome`, `Descricao`, `TipoProdutoID`, `Disponibilidade`, `quantidade`, `donativo`, `data_de_criacao`) VALUES
('APCVC122', 'Aasasasasasas', 'sdfsdfdsfsd', 1, 'Sim', 3, 'Sim', '2024-07-29 22:27:25'),
('APCVC555', 'bbbbbbbbbbb', NULL, 1, NULL, 3, NULL, '2024-07-29 22:27:25'),
('PA001', 'Produto Apoio 1', 'Descrição do Produto Apoio 1', 1, 'Sim', 0, 'Sim', '2024-07-29 20:34:08'),
('PA002', 'Produto Apoio 2', 'Descrição do Produto Apoio 2', 1, 'Sim', 15, 'Não', '2024-07-24 16:34:03'),
('PA003', 'Produto Apoio 3', 'Descrição do Produto Apoio 3', 1, 'Sim', 20, 'Sim', '2024-07-24 16:34:03'),
('PA004', 'Produto Apoio 4', 'Descrição do Produto Apoio 4', 1, 'Não', 5, 'Sim', '2024-07-24 16:34:03'),
('PA005', 'Produto Apoio 5', 'Descrição do Produto Apoio 5', 1, 'Sim', 30, 'Não', '2024-07-24 16:34:03'),
('PA006', 'Produto Apoio 6', 'Descrição do Produto Apoio 6', 1, 'Sim', 13, 'Sim', '2024-07-29 20:04:23'),
('PA007', 'Produto Apoio 7', 'Descrição do Produto Apoio 7', 1, 'Sim', 2147483643, 'Não', '2024-07-29 20:11:53'),
('PA008', 'Produto Apoio 8', 'Descrição do Produto Apoio 8', 1, 'Não', 14, 'Sim', '2024-07-29 20:04:26'),
('PA009', 'Produto Apoio 9', 'Descrição do Produto Apoio 9', 1, 'Sim', 25, 'Não', '2024-07-24 16:34:03'),
('PA010', 'Produto Apoio 10', 'Descrição do Produto Apoio 10', 1, 'Sim', 22, 'Sim', '2024-07-24 16:34:03'),
('PA011', 'Produto Apoio 11', 'Descrição do Produto Apoio 11', 1, 'Sim', 10, 'Sim', '2024-07-24 16:34:03'),
('PA012', 'Produto Apoio 12', 'Descrição do Produto Apoio 12', 1, 'Sim', 15, 'Não', '2024-07-24 16:34:03'),
('PA013', 'Produto Apoio 13', 'Descrição do Produto Apoio 13', 1, 'Sim', 20, 'Sim', '2024-07-24 16:34:03'),
('PA014', 'Produto Apoio 14', 'Descrição do Produto Apoio 14', 1, 'Não', 5, 'Sim', '2024-07-24 16:34:03'),
('PA015', 'Produto Apoio 15', 'Descrição do Produto Apoio 15', 1, 'Sim', 30, 'Não', '2024-07-24 16:34:03'),
('PA016', 'Produto Apoio 16', 'Descrição do Produto Apoio 16', 1, 'Sim', 12, 'Sim', '2024-07-24 16:34:03'),
('PA017', 'Produto Apoio 17', 'Descrição do Produto Apoio 17', 1, 'Sim', 18, 'Não', '2024-07-24 16:34:03'),
('PA018', 'Produto Apoio 18', 'Descrição do Produto Apoio 18', 1, 'Não', 7, 'Sim', '2024-07-24 16:34:03'),
('PA019', 'Produto Apoio 19', 'Descrição do Produto Apoio 19', 1, 'Sim', 25, 'Não', '2024-07-24 16:34:03'),
('PA020', 'Produto Apoio 20', 'Descrição do Produto Apoio 20', 1, 'Sim', 22, 'Sim', '2024-07-24 16:34:03'),
('PA021', 'Produto Apoio 21', 'Descrição do Produto Apoio 21', 1, 'Sim', 10, 'Sim', '2024-07-24 16:34:03'),
('PA022', 'Produto Apoio 22', 'Descrição do Produto Apoio 22', 1, 'Sim', 15, 'Não', '2024-07-24 16:34:03'),
('PA023', 'Produto Apoio 23', 'Descrição do Produto Apoio 23', 1, 'Sim', 20, 'Sim', '2024-07-24 16:34:03'),
('PA024', 'Produto Apoio 24', 'Descrição do Produto Apoio 24', 1, 'Não', 5, 'Sim', '2024-07-24 16:34:03'),
('PA025', 'Produto Apoio 25', 'Descrição do Produto Apoio 25', 1, 'Sim', 30, 'Não', '2024-07-24 16:34:03'),
('PA026', 'Produto Apoio 26', 'Descrição do Produto Apoio 26', 1, 'Sim', 12, 'Sim', '2024-07-24 16:34:03'),
('PA027', 'Produto Apoio 27', 'Descrição do Produto Apoio 27', 1, 'Sim', 18, 'Não', '2024-07-24 16:34:03'),
('PA028', 'Produto Apoio 28', 'Descrição do Produto Apoio 28', 1, 'Não', 7, 'Sim', '2024-07-24 16:34:03'),
('PA029', 'Produto Apoio 29', 'Descrição do Produto Apoio 29', 1, 'Sim', 25, 'Não', '2024-07-24 16:34:03'),
('PA030', 'Produto Apoio 30', 'Descrição do Produto Apoio 30', 1, 'Sim', 22, 'Sim', '2024-07-24 16:34:03'),
('PA031', 'Produto Apoio 31', 'Descrição do Produto Apoio 31', 1, 'Sim', 10, 'Sim', '2024-07-24 16:34:03'),
('PA032', 'Produto Apoio 32', 'Descrição do Produto Apoio 32', 1, 'Sim', 15, 'Não', '2024-07-24 16:34:03'),
('PA033', 'Produto Apoio 33', 'Descrição do Produto Apoio 33', 1, 'Sim', 20, 'Sim', '2024-07-24 16:34:03'),
('PA034', 'Produto Apoio 34', 'Descrição do Produto Apoio 34', 1, 'Não', 5, 'Sim', '2024-07-24 16:34:03'),
('PA035', 'Produto Apoio 35', 'Descrição do Produto Apoio 35', 1, 'Sim', 120, 'Não', '2024-07-29 20:00:36'),
('PA036', 'Produto Apoio 36', 'Descrição do Produto Apoio 36', 1, 'Sim', 12, 'Sim', '2024-07-24 16:34:03'),
('PA037', 'Produto Apoio 37', 'Descrição do Produto Apoio 37', 1, 'Sim', 18, 'Não', '2024-07-24 16:34:03'),
('PA038', 'Produto Apoio 38', 'Descrição do Produto Apoio 38', 1, 'Não', 7, 'Sim', '2024-07-24 16:34:03'),
('PA039', 'Produto Apoio 39', 'Descrição do Produto Apoio 39', 1, 'Sim', 25, 'Não', '2024-07-24 16:34:03'),
('PA040', 'Produto Apoio 40', 'Descrição do Produto Apoio 40', 1, 'Sim', 22, 'Sim', '2024-07-24 16:34:03'),
('PA041', 'Produto Apoio 41', 'Descrição do Produto Apoio 41', 1, 'Sim', 10, 'Sim', '2024-07-24 16:34:03'),
('PA042', 'Produto Apoio 42', 'Descrição do Produto Apoio 42', 1, 'Sim', 15, 'Não', '2024-07-24 16:34:03'),
('PA043', 'Produto Apoio 43', 'Descrição do Produto Apoio 43', 1, 'Sim', 20, 'Sim', '2024-07-24 16:34:03'),
('PA044', 'Produto Apoio 44', 'Descrição do Produto Apoio 44', 1, 'Não', 5, 'Sim', '2024-07-24 16:34:03'),
('PA045', 'Produto Apoio 45', 'Descrição do Produto Apoio 45', 1, 'Sim', 30, 'Não', '2024-07-24 16:34:03'),
('PA046', 'Produto Apoio 46', 'Descrição do Produto Apoio 46', 1, 'Sim', 12, 'Sim', '2024-07-24 16:34:03'),
('PA047', 'Produto Apoio 47', 'Descrição do Produto Apoio 47', 1, 'Sim', 18, 'Não', '2024-07-24 16:34:03'),
('PA048', 'Produto Apoio 48', 'Descrição do Produto Apoio 48', 1, 'Não', 7, 'Sim', '2024-07-24 16:34:03'),
('PA049', 'Produto Apoio 49', 'Descrição do Produto Apoio 49', 1, 'Sim', 25, 'Não', '2024-07-24 16:34:03'),
('PA050', 'Produto Apoio 50', 'Descrição do Produto Apoio 50', 1, 'Sim', 22, 'Sim', '2024-07-24 16:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `tiposprodutosdeapoio`
--

CREATE TABLE `tiposprodutosdeapoio` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tiposprodutosdeapoio`
--

INSERT INTO `tiposprodutosdeapoio` (`ID`, `Nome`) VALUES
(1, 'Cadeira de Rodas (2)'),
(9, 'Muletas'),
(10, 'Categoria 1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dados_empressa`
--
ALTER TABLE `dados_empressa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doacoes`
--
ALTER TABLE `doacoes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ClienteID` (`ClienteID`);

--
-- Indexes for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `imagensprodutosdeapoio`
--
ALTER TABLE `imagensprodutosdeapoio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FuncionarioID` (`FuncionarioID`),
  ADD KEY `ClienteID` (`ClienteID`),
  ADD KEY `movimentacoesinventario_ibfk_1` (`ProdutoDeApoioID`);

--
-- Indexes for table `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produtosdeapoio`
--
ALTER TABLE `produtosdeapoio`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tiposprodutosdeapoio`
--
ALTER TABLE `tiposprodutosdeapoio`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=425;

--
-- AUTO_INCREMENT for table `dados_empressa`
--
ALTER TABLE `dados_empressa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doacoes`
--
ALTER TABLE `doacoes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `imagensprodutosdeapoio`
--
ALTER TABLE `imagensprodutosdeapoio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT for table `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=815;

--
-- AUTO_INCREMENT for table `tiposprodutosdeapoio`
--
ALTER TABLE `tiposprodutosdeapoio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
