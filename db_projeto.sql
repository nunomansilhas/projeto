-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Jun-2024 às 17:23
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_projeto`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Morada` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telemovel` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`ID`, `Nome`, `Morada`, `Email`, `Telemovel`) VALUES
(1, 'João Silva', 'Rua da Amizade, 123', 'joao@example.com', '123456789'),
(2, 'Ana Santos', 'Avenida Central, 456', 'ana@example.com', '987654321');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `username` varchar(150) NOT NULL,
  `profileImg` varchar(150) NOT NULL,
  `Cargo` enum('Administrador','Gestor','Assistente') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`ID`, `Nome`, `username`, `profileImg`, `Cargo`, `Email`, `Senha`) VALUES
(1, 'Pedro Costa', 'pedrocosta', 'img/profileimg1.png', 'Administrador', 'pedro@example.com', '$2b$10$N9qo8uLOickgx2ZMRZo4ieWAW8i3JaFgNf3nN5Xg7ZX6O7t6aP3Wy'),
(2, 'Marta Rodrigues', 'martarodrigues', 'img/profileimg2.png', 'Gestor', 'marta@example.com', 'password456'),
(3, 'Nuno Mansilhas', 'nunomansilhas', '', 'Administrador', 'Nuno@example.com', '$2b$10$3jt91pinI7cx8oS1b2d8nu.LafnH4WIk3.TiWsJlbjCwogdq7am72');

-- --------------------------------------------------------

--
-- Estrutura da tabela `imagensprodutosdeapoio`
--

CREATE TABLE `imagensprodutosdeapoio` (
  `id` int(11) NOT NULL,
  `idProduto` varchar(150) NOT NULL,
  `imageUrl` varchar(150) NOT NULL,
  `mainImg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `movimentacoesinventario`
--

CREATE TABLE `movimentacoesinventario` (
  `ID` int(11) NOT NULL,
  `ProdutoDeApoioID` int(11) NOT NULL,
  `TipoMovimentacao` enum('Entrada','Saída') NOT NULL,
  `Quantidade` int(11) NOT NULL,
  `DataMovimentacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `FuncionarioID` int(11) NOT NULL,
  `ClienteID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL,
  `id_utilizador` int(11) DEFAULT NULL,
  `tipo_acao` varchar(255) DEFAULT NULL,
  `descricao_acao` text DEFAULT NULL,
  `data_acao` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `notificacoes`
--

INSERT INTO `notificacoes` (`id`, `id_utilizador`, `tipo_acao`, `descricao_acao`, `data_acao`, `status`) VALUES
(1, 1, 'Adicionado', 'Produto adicionado ao inventário', '2024-05-30 18:53:41', 'Adicionado'),
(2, 2, 'Adicionado', 'Novo produto adicionado ao inventário: Produto ABC', '2024-05-27 11:20:00', 'Adicionado'),
(5, 1, 'Pago', 'Pagamento de $100 recebido da empresa XYZ', '2024-05-24 16:15:00', 'Pago'),
(6, 2, 'Pedido', 'Novo pedido recebido de Cliente ABC', '2024-05-23 09:00:00', 'Novo Pedido'),
(9, 1, 'Atualizado', 'Atualização do sistema para a versão 2.0 concluída', '2024-05-20 12:00:00', 'Atualizado'),
(10, 2, 'Relatório', 'Novo relatório mensal gerado e disponível para download', '2024-05-19 09:45:00', 'Novo Relatório');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtosdeapoio`
--

CREATE TABLE `produtosdeapoio` (
  `ID` varchar(150) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Descricao` text NOT NULL,
  `TipoProdutoID` int(11) NOT NULL,
  `Disponibilidade` varchar(50) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `donativo` varchar(150) NOT NULL,
  `data_de_criacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produtosdeapoio`
--

INSERT INTO `produtosdeapoio` (`ID`, `Nome`, `Descricao`, `TipoProdutoID`, `Disponibilidade`, `quantidade`, `donativo`, `data_de_criacao`) VALUES
('', 'sdfas', 'asdfa', 1, 'Não', 0, 'Sim', '2024-06-01 20:11:39'),
('sadadasd', 'sadad', '', 0, 'Sim', 0, '', '2024-06-01 12:17:41'),
('sd', 'sd', '', 0, 'Sim', 0, '', '2024-06-01 12:02:27'),
('sds', 'sd', '', 0, 'Sim', 0, '', '2024-06-01 12:02:43'),
('testsder', 'rfdvewfr', 'dregretre', 1, 'Não', 5, '', '2024-06-01 02:01:05');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tiposprodutosdeapoio`
--

CREATE TABLE `tiposprodutosdeapoio` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tiposprodutosdeapoio`
--

INSERT INTO `tiposprodutosdeapoio` (`ID`, `Nome`) VALUES
(1, 'Cadeira de Rodas'),
(2, 'Andarilho'),
(3, 'Bengala');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `imagensprodutosdeapoio`
--
ALTER TABLE `imagensprodutosdeapoio`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FuncionarioID` (`FuncionarioID`),
  ADD KEY `ClienteID` (`ClienteID`),
  ADD KEY `movimentacoesinventario_ibfk_1` (`ProdutoDeApoioID`);

--
-- Índices para tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produtosdeapoio`
--
ALTER TABLE `produtosdeapoio`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `tiposprodutosdeapoio`
--
ALTER TABLE `tiposprodutosdeapoio`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `imagensprodutosdeapoio`
--
ALTER TABLE `imagensprodutosdeapoio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tiposprodutosdeapoio`
--
ALTER TABLE `tiposprodutosdeapoio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `movimentacoesinventario`
--
ALTER TABLE `movimentacoesinventario`
  ADD CONSTRAINT `movimentacoesinventario_ibfk_2` FOREIGN KEY (`FuncionarioID`) REFERENCES `funcionarios` (`ID`),
  ADD CONSTRAINT `movimentacoesinventario_ibfk_3` FOREIGN KEY (`ClienteID`) REFERENCES `clientes` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
