import { confirmDelete, deleteBeneficiary } from './beneficiario-eliminar.js'; // Importando as funções de exclusão

async function fetchBeneficiarios() {
  const response = await fetch('http://localhost:3000/api/clientes');
  return response.json();
}

async function populateDataTable() {
  const beneficiarios = await fetchBeneficiarios();

  // Populate DataTable
  const tableBody = document.querySelector('#beneficiariosTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  beneficiarios.forEach(beneficiario => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${beneficiario.id}</td>
      <td>${beneficiario.nome}</td>
      <td>${beneficiario.email}</td>
      <td>${beneficiario.telemovel}</td>
      <td>${beneficiario.morada}</td>
      <td class="text-right">
        <a href="beneficiarios-visualizar.html?id=${beneficiario.id}" type="button" class="btn btn-rounded btn-basic btn-icon"><i class="fa fa-eye"></i></a>
        <a href="#" type="button" class="btn btn-rounded btn-basic btn-icon delete-beneficiario" data-beneficiario-id="${beneficiario.id}" data-beneficiario-name="${beneficiario.nome}"><i class="fa fa-trash"></i></a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Initialize DataTable
  $('#beneficiariosTable').DataTable();

  // Adicionar evento de clique para os botões de exclusão
  const deleteButtons = document.querySelectorAll('.delete-beneficiario');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const beneficiarioId = button.dataset.beneficiarioId;
      const beneficiarioName = button.dataset.beneficiarioName;
      const confirmed = await confirmDelete(); // Função para exibir modal de confirmação
      if (confirmed) {
        // Se a exclusão for confirmada, chame a função para excluir o beneficiário
        await deleteBeneficiary(beneficiarioId, beneficiarioName);
        // Atualize a tabela após a exclusão
        resetAndRefreshTable();
      }
    });
  });
}

// Função para reinicializar e atualizar a tabela
async function resetAndRefreshTable() {
  const table = $('#beneficiariosTable').DataTable();
  table.clear().destroy(); // Limpa e destrói a tabela existente

  // Re-popula a tabela
  await populateDataTable();
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
