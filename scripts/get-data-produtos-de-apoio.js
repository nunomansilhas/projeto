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
        <a style="border: 1px solid blue;" href="#" type="button" class="btn btn-rounded btn-light btn-icon"><i class="fa fa-eye"></i></a>
        <a style="border: 1px solid green;" href="#" type="button" class="btn btn-rounded btn-light btn-icon"><i class="fa fa-edit"></i></a>
        <a style="border: 1px solid red;" href="#" type="button" class="btn btn-rounded btn-light btn-icon delete-product" data-product-id="${produto.ID}" data-product-name="${produto.Nome}"><i class="fa fa-trash"></i></a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Initialize DataTable
  $('#produtosTable').DataTable();

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

// Função para exibir modal de confirmação
function confirmDelete() {
  return new Promise((resolve) => {
    swal({
      title: "Tem certeza?",
      text: "Não será capaz de recuperar este item!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar!",
      closeOnConfirm: false,
      closeOnCancel: true
    }, function(isConfirm) {
      resolve(isConfirm);
    });
  });
}

// Função para excluir o produto e suas imagens associadas
async function deleteProduct(productId, productName) {
  try {
    // Excluir o produto
    const response = await fetch(`http://localhost:3000/api/produtos/${productId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir o produto');
    }

    // Obter as imagens associadas ao produto
    const imagesResponse = await fetch(`http://localhost:3000/api/upload/${productId}`);
    if (!imagesResponse.ok) {
      throw new Error('Erro ao obter as imagens do produto');
    }
    const images = await imagesResponse.json();

    // Excluir as imagens associadas ao produto
    for (const image of images) {
      const imageResponse = await fetch(`http://localhost:3000/api/upload/${image.id}`, {
        method: 'DELETE'
      });
      if (!imageResponse.ok) {
        throw new Error('Erro ao excluir a imagem');
      }
    }

    // Enviar notificação de exclusão
    await enviarNotificacao('Excluído', `Funcionario excluiu o Produto de Apoio (${productName})`);

    swal("Eliminado!", "O seu produto e imagens associadas foram eliminados com sucesso.", "success");
  } catch (error) {
    console.error('Error:', error);
    swal("Erro", "Ocorreu um erro ao excluir o produto.", "error");
  }
}

// Função para enviar notificação
async function enviarNotificacao(tipoAcao, descricaoAcao) {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      credentials: 'include' // Necessário para enviar cookies de sessão
    });

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    const data = await response.json();
    if (data.user) {
      const notificacaoPayload = {
        id_utilizador: data.user.id,
        tipo_acao: tipoAcao,
        descricao_acao: descricaoAcao,
        status: tipoAcao
      };

      const response_not = await fetch('http://localhost:3000/api/notificacoes', {
        method: 'POST',
        body: JSON.stringify(notificacaoPayload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response_not.ok) {
        throw new Error('Failed to create notification');
      }

      console.log('Notificação criada com sucesso');
    }
  } catch (error) {
    console.error('Error:', error);
    window.location.href = './login.html';
  }
}

// Função para reinicializar e atualizar a tabela
async function resetAndRefreshTable() {
  const table = $('#produtosTable').DataTable();
  table.clear().destroy(); // Limpa e destrói a tabela existente

  // Re-popula a tabela
  await populateDataTable();
}

// Populate the DataTable when the document is ready
document.addEventListener('DOMContentLoaded', populateDataTable);
