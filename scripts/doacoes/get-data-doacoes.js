import { showDoacaoDetalhesModal } from './doacao-detalhes.js';

async function fetchDoacoes() {
  const response = await fetch('http://localhost:3000/api/doacoes');
  return response.json();
}

async function fetchClienteData(clienteId) {
  const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do cliente');
  return response.json();
}

async function populateDataTable() {
  const doacoes = await fetchDoacoes();

  // Populate DataTable
  const tableBody = document.querySelector('#doacoesTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  for (const doacao of doacoes) {
    const clienteData = await fetchClienteData(doacao.ClienteID);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${doacao.ID}</td>
      <td>${doacao.ProdutoID}</td>
      <td>${clienteData.nome}</td>
      <td>${doacao.Quantidade}</td>
      <td>${new Date(doacao.DataDoacao).toLocaleDateString()}</td>
      <td><button type="button" class="btn btn-square ver-mais-doacao" data-doacao-id="${doacao.ID}">Ver Mais</button></td>
    `;
    tableBody.appendChild(row);
  }

  // Initialize DataTable
  $('#doacoesTable').DataTable({
    language: {
        info: "Mostrar página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhuma entrada disponível",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        lengthMenu: "Mostrar _MENU_ entradas por página",
        zeroRecords: "Não foi encontrada nenhuma Doação",
        search: "Procurar:",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        }
    }
});

  // Add event listeners for "Ver Mais" buttons
  document.querySelectorAll('.ver-mais-doacao').forEach(button => {
    button.addEventListener('click', (event) => {
      const doacaoId = event.currentTarget.getAttribute('data-doacao-id');
      showDoacaoDetalhesModal(doacaoId);
    });
  });
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
