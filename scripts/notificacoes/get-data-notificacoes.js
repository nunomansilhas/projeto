async function fetchNotificacoes() {
  const response = await fetch('http://localhost:3000/api/notificacoes');
  return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
  const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
  return response.json();
}

function getStatusClass(status) {
  switch (status) {
      case 'Adicionado':
          return 'label-success';
      case 'Editado':
          return 'label-primary';
      case 'Entrou':
          return 'label-warning';
      case 'Novo Produto':
          return 'label-info';
      case 'Relatório Criado':
          return 'label-primary';
      case 'Eliminado':
          return 'label-danger';
      default:
          return 'label-default';
  }
}

async function populateDataTable() {
  const notificacoes = await fetchNotificacoes();

  // Populate DataTable
  const tableBody = document.querySelector('#notificacoesTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  for (const notificacao of notificacoes) {
      try {
          const funcionarioData = await fetchFuncionarioData(notificacao.id_utilizador);
          const statusClass = getStatusClass(notificacao.status);

          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${notificacao.id}</td>
              <td>${funcionarioData.Nome}</td>
              <td>${notificacao.tipo_acao}</td>
              <td>${notificacao.descricao_acao}</td>
              <td>${new Date(notificacao.data_acao).toLocaleDateString()}</td>
              <td><span class="label ${statusClass}">${notificacao.status}</span></td>
          `;
          tableBody.appendChild(row);
      } catch (error) {
          console.error('Erro ao buscar dados do funcionário:', error);
          const row = document.createElement('tr');
          const statusClass = getStatusClass(notificacao.status);
          row.innerHTML = `
              <td>${notificacao.id}</td>
              <td>${notificacao.id_utilizador}</td>
              <td>${notificacao.tipo_acao}</td>
              <td>${notificacao.descricao_acao}</td>
              <td>${new Date(notificacao.data_acao).toLocaleDateString()}</td>
              <td><span class="label ${statusClass}">${notificacao.status}</span></td>
          `;
          tableBody.appendChild(row);
      }
  }

  // Initialize DataTable
  $('#notificacoesTable').DataTable();
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
