import { enviarNotificacao } from './enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para criar o modal de edição de imagens
function createEditImagesModal(images, productId) {
  const modalHtml = `
    <div class="modal fade" id="editImagesModal" tabindex="-1" role="dialog" aria-labelledby="editImagesModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="editImagesModalLabel">Editar Imagens</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="row">
                ${images.map(image => `
                  <div style="border: 2px solid transparent;" class="col-md-3 text-center image-item" data-image-id="${image.id}">
                    <img src="${image.imageUrl}" class="img-thumbnail" style="width: 100px; height: 100px; ">
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-danger" id="deleteSelectedImages">Eliminar Selecionada(as) (0)</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Adicionar evento de clique para selecionar/desmarcar imagens
  const imageItems = document.querySelectorAll('.image-item');
  imageItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('selected-image');
      updateDeleteButton();
    });
  });

  // Função para atualizar o botão de eliminar imagens
  function updateDeleteButton() {
    const selectedCount = document.querySelectorAll('.image-item.selected-image').length;
    document.getElementById('deleteSelectedImages').innerText = `Eliminar Selecionada(as) (${selectedCount})`;
  }

  // Adicionar evento de clique para o botão de eliminar imagens selecionadas
  document.getElementById('deleteSelectedImages').addEventListener('click', async () => {
    const selectedItems = document.querySelectorAll('.image-item.selected-image');
    const imageIdsToDelete = Array.from(selectedItems).map(item => item.getAttribute('data-image-id'));

    console.log('Containers selecionados:', selectedItems);
    console.log('IDs das imagens a serem excluídas:', imageIdsToDelete);

    try {
      await deleteSelectedImages(imageIdsToDelete, productId);

      // Ajustar o texto de "Imagem/Imagens" conforme a quantidade
      const quantidade = imageIdsToDelete.length;
      const textoImagem = quantidade === 1 ? 'Imagem' : 'Imagens';

      // Enviar uma notificação única após todas as imagens serem eliminadas
      await enviarNotificacao('Eliminado', `Eliminou ${quantidade} ${textoImagem} do Produto de Apoio com ID:(${productId})`);

      location.reload(); // Recarrega a página para atualizar a galeria de imagens
    } catch (error) {
      console.error('Erro ao eliminar imagens:', error);
    }
  });
}

// Função para eliminar imagens selecionadas
async function deleteSelectedImages(imageIds, productId) {
  const deletePromises = imageIds.map(async (imageId) => {
    const response = await fetch(`http://localhost:3000/api/upload/${imageId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Falha ao eliminar a imagem com ID: ${imageId}`);
    }
    return response.json();
  });

  return Promise.all(deletePromises);
}

export { createEditImagesModal, deleteSelectedImages };
