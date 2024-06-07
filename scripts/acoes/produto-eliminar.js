import { enviarNotificacao } from './enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para exibir modal de confirmação
async function confirmDelete() {
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

    // Tentar excluir movimentações do produto
    const movimentacaoResponse = await fetch(`http://localhost:3000/api/movimentacoes/produto/${productId}`, {
      method: 'DELETE'
    });
    
    // Checar se a resposta não foi ok e não foi "Not Found"
    if (!movimentacaoResponse.ok && movimentacaoResponse.status !== 404) {
      throw new Error('Erro ao excluir as movimentações do produto');
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
    await enviarNotificacao('Eliminado', `Eliminou o Produto de Apoio (${productName})`);

    swal("Eliminado!", "O seu produto e imagens associadas foram eliminados com sucesso.", "success");
  } catch (error) {
    console.error('Error:', error);
    swal("Erro", "Ocorreu um erro ao excluir o produto.", "error");
  }
}

export { confirmDelete, deleteProduct };
