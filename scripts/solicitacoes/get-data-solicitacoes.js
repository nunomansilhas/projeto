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
  try {
    const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`);
    if (!response.ok) throw new Error('Cliente não encontrado');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
    // Retorna um objeto padrão quando o cliente não é encontrado
    return { nome: 'Cliente desconhecido' }; 
  }
}

async function populateDataTable() {
  const solicitacoes = await fetchSolicitacoes();

  const tableBody = document.querySelector('#solicitacoesTable tbody');
  tableBody.innerHTML = ''; // Limpa as linhas existentes

  for (const solicitacao of solicitacoes) {
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
  }

  // Inicialização do DataTable
  $('#solicitacoesTable').DataTable({
    language: {
        info: "Mostrar página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhuma entrada disponível",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        lengthMenu: "Mostrar _MENU_ entradas por página",
        zeroRecords: "Não foi encontrada nenhuma Solicitação",
        search: "Procurar:",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        }
    }
  });

  // Adiciona listeners para os botões "Ver Mais"
  document.querySelectorAll('.ver-mais-solicitacao').forEach(button => {
    button.addEventListener('click', (event) => {
      const solicitacaoId = event.currentTarget.getAttribute('data-solicitacao-id');
      showSolicitacaoDetalhesModal(solicitacaoId);
    });
  });
}

// Popula a DataTable quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', populateDataTable);
