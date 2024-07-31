-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2024 at 03:24 PM
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
(1, 'João Silva', 'Rua das Flores, 123', 'joao.silva@email.com', '912345678', '/img/joao.png'),
(2, 'Maria Santos', 'Av. dos Aliados, 45', 'maria.santos@email.com', '923456789', '/img/maria.png'),
(3, 'Pedro Costa', 'Rua da Liberdade, 789', 'pedro.costa@email.com', '934567890', '/img/pedro.png');

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
(1, '999 999 999', 'Rua Principal, 123', 'Viana do Castelo', '258123456', 'apcvc@apcvc.org');

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
(2, 'PA002', 2, 10, '2024-05-05'),
(3, 'PA003', 3, 8, '2024-06-15'),
(103, 'PA001', 1, 5, '2024-07-30');

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
(1, 'Ana Rodrigues', 'arodrigues', '/img/ana.png', 'Administrador', 'ana.rodrigues@email.com', '$2b$10$gKvgag5pUOnJfwB9XzuEV.TB0CGzhKlYDte/wQ3BBrpljYP94f.L.'),
(2, 'Luis Oliveira', 'loliveira', '/img/luis.png', 'Gestor', 'luis.oliveira@email.com', 'senha123'),
(3, 'Nuno Mansilhas', 'nunomansilhas', 'img/profileimg1.png', 'Administrador', 'nunomansilhas@gmail.com', '$2b$10$grSIzBWM7ah1og68DgM2u.H/w83EQTsi7IOgGFT/o7Rz36OKAO7zK'),
(4, 'Marta Ferreira', 'mferreira', '/img/marta.png', 'Assistente', 'marta.ferreira@email.com', 'senha123'),
(38, 'João Pedro', 'admin', '', 'Administrador', 'mansilhas951_1996@hotmail.com', '$2b$10$n/rL6iRx3miASCgPT2l0kO0IQGek2Ipl1xoV8.ruNM47K8RUA9LfO');

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
(242, 'PA003', 'img/produtos/1722418094269-4K8z37wwgPJKvvI.png', 0),
(243, 'PA002', 'img/produtos/1722418272145-XrO42Sl5OEtvozD.png', 0),
(244, 'PA001', 'img/produtos/1722418651027-uicWDGx6IeGen3c.jpg', 0);

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
(1, 'PA001', 'Entrada', 10, '2024-01-15 10:00:00', '2024-01-30 00:00:00', 1, 1),
(2, 'PA002', 'Entrada', 5, '2024-02-20 14:30:00', '2024-03-05 00:00:00', 2, 2),
(3, 'PA003', 'Entrada', 15, '2024-03-10 09:00:00', '2024-05-07 00:00:00', 3, 3),
(115, 'PA001', 'Entrada', 10, '2024-01-15 10:00:00', '2024-01-30 00:00:00', 1, 1),
(116, 'PA002', 'Entrada', 5, '2024-02-20 14:30:00', '2024-03-13 00:00:00', 2, 2),
(117, 'PA003', 'Entrada', 15, '2024-03-10 09:00:00', '2024-05-07 00:00:00', 3, 3),
(118, 'PA001', 'Entrada', 10, '2024-01-15 10:00:00', '2024-02-01 00:00:00', 1, 1),
(119, 'PA002', 'Entrada', 5, '2024-02-20 14:30:00', '2024-03-05 00:00:00', 2, 2),
(120, 'PA003', 'Entrada', 15, '2024-03-10 09:00:00', '2024-05-08 00:00:00', 3, 3),
(121, 'PA001', 'Saída', 10, '2024-01-15 10:00:00', '2025-01-31 00:00:00', 1, 1),
(122, 'PA002', 'Saída', 5, '2024-02-20 14:30:00', '2024-03-05 00:00:00', 2, 2),
(123, 'PA003', 'Entrada', 15, '2024-03-10 09:00:00', '2030-02-21 00:00:00', 3, 3);

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
(816, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-30 22:39:57', 'Login'),
(817, 3, 'Artigo Devolvido', 'O artigo com ID: 2 foi devolvido com sucesso.', '2024-07-30 22:48:38', 'Artigo Devolvido'),
(818, 3, 'Artigo Devolvido', 'O artigo com ID: 3 foi devolvido com sucesso.', '2024-07-30 22:49:07', 'Artigo Devolvido'),
(819, 3, 'Editado', 'Alterou a senha do Funcionário Ana Rodrigues com ID:(1)', '2024-07-30 22:54:57', 'Editado'),
(820, 3, 'Artigo Devolvido', 'O artigo com ID: 1 foi devolvido com sucesso.', '2024-07-30 23:00:52', 'Artigo Devolvido'),
(821, 38, 'Login', 'Utilizador João222 Silva111111111111 fez login na plataforma', '2024-07-30 23:03:58', 'Login'),
(822, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-30 23:04:23', 'Login'),
(823, 38, 'Login', 'Utilizador João222 Silva111111111111 fez login na plataforma', '2024-07-30 23:05:15', 'Login'),
(824, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-30 23:05:23', 'Login'),
(825, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 09:10:31', 'Login'),
(826, 3, 'Adicionado', 'Adicionou 1 Imagem ao Produto de Apoio com ID:(PA003)', '2024-07-31 09:28:14', 'Adicionado'),
(827, 3, 'Adicionado', 'Adicionou 1 Imagem ao Produto de Apoio com ID:(PA002)', '2024-07-31 09:31:12', 'Adicionado'),
(828, 3, 'Adicionado', 'Adicionou 1 Imagem ao Produto de Apoio com ID:(PA001)', '2024-07-31 09:37:31', 'Adicionado'),
(829, 3, 'Artigo Devolvido', 'O artigo com ID: 1 foi devolvido com sucesso.', '2024-07-31 10:02:52', 'Artigo Devolvido'),
(830, 3, 'Artigo Devolvido', 'O artigo com ID: 115 foi devolvido com sucesso.', '2024-07-31 10:03:00', 'Artigo Devolvido'),
(831, 3, 'Artigo Devolvido', 'O artigo com ID: 3 foi devolvido com sucesso.', '2024-07-31 10:03:02', 'Artigo Devolvido'),
(832, 3, 'Artigo Devolvido', 'O artigo com ID: 2 foi devolvido com sucesso.', '2024-07-31 10:03:07', 'Artigo Devolvido'),
(833, 3, 'Artigo Devolvido', 'O artigo com ID: 116 foi devolvido com sucesso.', '2024-07-31 10:22:43', 'Artigo Devolvido'),
(834, 3, 'Artigo Devolvido', 'O artigo com ID: 116 foi devolvido com sucesso.', '2024-07-31 10:22:52', 'Artigo Devolvido'),
(835, 3, 'Artigo Devolvido', 'O artigo com ID: 117 foi devolvido com sucesso.', '2024-07-31 10:22:57', 'Artigo Devolvido'),
(836, 3, 'Artigo Devolvido', 'O artigo com ID: 118 foi devolvido com sucesso.', '2024-07-31 10:34:23', 'Artigo Devolvido'),
(837, 3, 'Artigo Devolvido', 'O artigo com ID: 119 foi devolvido com sucesso.', '2024-07-31 10:36:44', 'Artigo Devolvido'),
(838, 3, 'Artigo Devolvido', 'O artigo com ID: 121 foi devolvido com sucesso.', '2024-07-31 10:40:37', 'Artigo Devolvido'),
(839, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 10:48:59', 'Login'),
(840, 3, 'Editado', 'A data de devolução da solicitação ID: 120 foi atualizada para 2024-05-08', '2024-07-31 10:54:33', 'Editado'),
(841, 3, 'Editado', 'A data de devolução da solicitação ID: 120 foi atualizada para 2024-05-08', '2024-07-31 10:54:37', 'Editado'),
(842, 3, 'Artigo Devolvido', 'O artigo com ID: 120 foi devolvido com sucesso.', '2024-07-31 10:54:44', 'Artigo Devolvido'),
(843, 3, 'Eliminado', 'Eliminou a doação com ID: 1', '2024-07-31 10:55:59', 'Eliminado'),
(844, 3, 'Adicionado', 'Adicionou uma doação com o produto ID: PA001', '2024-07-31 10:57:02', 'Adicionado'),
(845, 3, 'Requisição Efetuada', 'Funcionário - ID: 3 efetuou a requisição do PA - ID: PA001 para o Beneficiário - ID: 1', '2024-07-31 11:01:29', 'Requisição Efetuada'),
(846, 3, 'Eliminado', 'Eliminou a requisição com ID: 124', '2024-07-31 11:01:37', 'Eliminado'),
(847, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-01-31', '2024-07-31 11:14:50', 'Editado'),
(848, 3, 'Artigo Devolvido', 'O artigo com ID: 121 foi devolvido com sucesso.', '2024-07-31 11:15:21', 'Artigo Devolvido'),
(849, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-02-01', '2024-07-31 11:15:36', 'Editado'),
(850, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-02-01', '2024-07-31 11:15:43', 'Editado'),
(851, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-02-22', '2024-07-31 11:15:53', 'Editado'),
(852, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-02-22', '2024-07-31 11:16:09', 'Editado'),
(853, 3, 'Artigo Devolvido', 'O artigo com ID: 121 foi devolvido com sucesso.', '2024-07-31 11:16:12', 'Artigo Devolvido'),
(854, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2024-02-23', '2024-07-31 11:19:07', 'Editado'),
(855, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-01', '2024-07-31 11:19:36', 'Editado'),
(856, 3, 'Artigo Devolvido', 'O artigo com ID: 121 foi devolvido com sucesso.', '2024-07-31 11:19:43', 'Artigo Devolvido'),
(857, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-02', '2024-07-31 11:19:57', 'Editado'),
(858, 3, 'Artigo Devolvido', 'O artigo com ID: 121 foi devolvido com sucesso.', '2024-07-31 11:19:59', 'Artigo Devolvido'),
(859, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-03', '2024-07-31 11:20:13', 'Editado'),
(860, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-04', '2024-07-31 11:20:17', 'Editado'),
(861, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-04', '2024-07-31 11:20:24', 'Editado'),
(862, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-02-26', '2024-07-31 11:20:29', 'Editado'),
(863, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-02-01', '2024-07-31 11:20:33', 'Editado'),
(864, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-02-01', '2024-07-31 11:20:44', 'Editado'),
(865, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-02-11', '2024-07-31 11:21:12', 'Editado'),
(866, 3, 'Editado', 'A data de devolução da requisição ID: 121 foi atualizada para 2025-01-31', '2024-07-31 11:21:49', 'Editado'),
(867, 3, 'Editado', 'A data de devolução da requisição ID: 123 foi atualizada para 2030-02-21', '2024-07-31 11:26:13', 'Editado'),
(868, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 12:18:52', 'Login'),
(869, 3, 'Artigo Devolvido', 'O artigo com ID: 123 foi devolvido com sucesso.', '2024-07-31 12:19:00', 'Artigo Devolvido'),
(870, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 12:41:57', 'Login'),
(871, 3, 'Editado', 'Alterou a senha do Funcionário Nuno Mansilhas com ID:(3)', '2024-07-31 12:42:03', 'Editado'),
(872, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 12:42:11', 'Login'),
(873, 38, 'Login', 'Utilizador João Pedro fez login na plataforma', '2024-07-31 13:23:50', 'Login'),
(874, 38, 'Login', 'Utilizador João Pedro fez login na plataforma', '2024-07-31 13:24:20', 'Login'),
(875, 38, 'Editado', 'Alterou a senha do Funcionário Nuno Mansilhas com ID:(3)', '2024-07-31 13:24:26', 'Editado'),
(876, 3, 'Login', 'Utilizador Nuno Mansilhas fez login na plataforma', '2024-07-31 13:24:30', 'Login');

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
('PA001', 'Cadeira de Rodas X1', 'Cadeira de Rodas modelo X1', 1, 'Sim', 15, 'Sim', '2024-07-31 11:01:37'),
('PA002', 'Muleta Ajustável M1', 'Muleta ajustável tamanho médio', 2, 'Sim', 20, 'Não', '2024-07-30 22:40:45'),
('PA003', 'Andador A2', 'Andador com suporte para braços', 3, 'Sim', 15, 'Sim', '2024-07-30 22:40:49');

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
(1, 'Cadeiras de Rodas'),
(2, 'Muletas'),
(3, 'Andadores');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `imagensprodutosdeapoio`
--
ALTER TABLE `imagensprodutosdeapoio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT for table `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=877;

--
-- AUTO_INCREMENT for table `tiposprodutosdeapoio`
--
ALTER TABLE `tiposprodutosdeapoio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
