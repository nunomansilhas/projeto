import { confirmDelete, deleteProduct } from './acoes/produto-eliminar.js'; // Importando as funções de exclusão

async function fetchTiposProdutos() {
  const response = await fetch('http://localhost:3000/api/tiposprodutos');
  return response.json();
}

async function fetchProdutos() {
  const response = await fetch('http://localhost:3000/api/produtos');
  return response.json();
}

async function populateDataTable() {
  const tiposProdutos = await fetchTiposProdutos();
  const produtos = await fetchProdutos();

  // Map TipoProdutoID to TipoProduto Nome
  const tipoProdutoMap = tiposProdutos.reduce((map, tipo) => {
    map[tipo.ID] = tipo.Nome;
    return map;
  }, {});

  // Populate DataTable
  const tableBody = document.querySelector('#produtosTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  produtos.forEach(produto => {
    const row = document.createElement('tr');
    const spanClass = produto.Disponibilidade === 'Sim' ? 'label label-success' : 'label label-danger'; // Dynamically set class
    row.innerHTML = `
      <td>${produto.ID}</td>
      <td>${produto.Nome}</td>
      <td>${produto.Descricao}</td>
      <td>${tipoProdutoMap[produto.TipoProdutoID] || 'N/A'}</td>
      <td><span class="${spanClass}">${produto.Disponibilidade}</span></td> <!-- Set class dynamically -->
      <td>${produto.quantidade}</td>
      <td class="text-right"><span class="label label-default">${produto.donativo}</span></td>
      <td class="text-right">
        <a href="produtos-visualizar.html?id=${produto.ID}" type="button" class="btn btn-rounded btn-basic btn-icon"><i class="fa fa-eye"></i></a>
        <a href="#" type="button" class="btn btn-rounded btn-basic btn-icon delete-product" data-product-id="${produto.ID}" data-product-name="${produto.Nome}"><i class="fa fa-trash"></i></a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Initialize DataTable
  $('#produtosTable').DataTable({
    language: {
        info: "Mostrar página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhuma entrada disponível",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        lengthMenu: "Mostrar _MENU_ entradas por página",
        zeroRecords: "Não foi encontrado nenhum Produto de Apoio",
        search: "Procurar:",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        }
    }
  });

  // Adicionar evento de clique para os botões de exclusão
  const deleteButtons = document.querySelectorAll('.delete-product');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const productId = button.dataset.productId;
      const productName = button.dataset.productName;
      const confirmed = await confirmDelete(); // Função para exibir modal de confirmação
      if (confirmed) {
        // Se a exclusão for confirmada, chame a função para excluir o produto
        await deleteProduct(productId, productName);
        // Atualize a tabela após a exclusão
        resetAndRefreshTable();
      }
    });
  });
}

// Função para reinicializar e atualizar a tabela
async function resetAndRefreshTable() {
  const table = $('#produtosTable').DataTable({
    language: {
        info: "Mostrar página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhuma entrada disponível",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        lengthMenu: "Mostrar _MENU_ entradas por página",
        zeroRecords: "Não foi encontrado nenhum Produto de Apoio",
        search: "Procurar:",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        }
    }
  });
  table.clear().destroy(); // Limpa e destrói a tabela existente

  // Re-popula a tabela
  await populateDataTable();
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
