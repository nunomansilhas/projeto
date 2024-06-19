import { showSolicitacaoDetalhesModal } from './solicitacao-detalhes.js';

async function fetchSolicitacoes() {
  const response = await fetch('http://localhost:3000/api/movimentacoes');
  return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
  const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
  return response.json();
}

async function fetchClienteData(clienteId) {
  const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do cliente');
  return response.json();
}

async function populateDataTable() {
  const solicitacoes = await fetchSolicitacoes();

  // Populate DataTable
  const tableBody = document.querySelector('#solicitacoesTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  for (const solicitacao of solicitacoes) {
    try {
      const funcionarioData = await fetchFuncionarioData(solicitacao.FuncionarioID);
      const clienteData = await fetchClienteData(solicitacao.ClienteID);
      const tipoMovimentacaoClass = solicitacao.TipoMovimentacao === 'Entrada' ? 'label label-success' : 'label label-info';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${solicitacao.ID}</td>
        <td>${solicitacao.ProdutoDeApoioID}</td>
        <td><span class="${tipoMovimentacaoClass}">${solicitacao.TipoMovimentacao}</span></td>
        <td>${solicitacao.Quantidade}</td>
        <td>${new Date(solicitacao.DataMovimentacao).toLocaleDateString()}</td>
        <td>${new Date(solicitacao.DataEntrega).toLocaleDateString()}</td>
        <td>${funcionarioData.Nome}</td>
        <td>${clienteData.nome}</td>
        <td>
            <button type="button" class="btn btn-square ver-mais-solicitacao" data-solicitacao-id="${solicitacao.ID}">Ver Mais</button>
        </td>
      `;
      tableBody.appendChild(row);
    } catch (error) {
      console.error('Erro ao buscar dados do funcionário ou cliente:', error);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${solicitacao.ID}</td>
        <td>${solicitacao.ProdutoDeApoioID}</td>
        <td>${solicitacao.TipoMovimentacao}</td>
        <td>${solicitacao.Quantidade}</td>
        <td>${new Date(solicitacao.DataMovimentacao).toLocaleDateString()}</td>
        <td>${new Date(solicitacao.DataEntrega).toLocaleDateString()}</td>
        <td>${funcionarioData ? funcionarioData.Nome : 'Erro ao buscar funcionário'}</td>
        <td>${clienteData ? clienteData.nome : 'Erro ao buscar cliente'}</td>
        <td>
            <button type="button" class="btn btn-square ver-mais-solicitacao" data-solicitacao-id="${solicitacao.ID}">Ver Mais</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  }

  // Initialize DataTable
  $('#solicitacoesTable').DataTable();

  // Add event listeners to "Ver Mais" buttons
  document.querySelectorAll('.ver-mais-solicitacao').forEach(button => {
    button.addEventListener('click', (event) => {
      const solicitacaoId = event.currentTarget.getAttribute('data-solicitacao-id');
      showSolicitacaoDetalhesModal(solicitacaoId);
    });
  });
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
