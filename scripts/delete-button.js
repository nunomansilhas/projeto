// Função para criar o modal de confirmação
function createConfirmationModal(productId) {
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal', 'fade');
    modalDiv.id = 'confirmDeleteModal';
    modalDiv.setAttribute('tabindex', '-1');
    modalDiv.setAttribute('role', 'dialog');
    modalDiv.setAttribute('aria-labelledby', 'confirmDeleteModalLabel');
  
    const modalDialogDiv = document.createElement('div');
    modalDialogDiv.classList.add('modal-dialog');
    modalDialogDiv.setAttribute('role', 'document');
  
    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('modal-content');
  
    const modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.classList.add('modal-header');
  
    const modalTitle = document.createElement('h4');
    modalTitle.classList.add('modal-title');
    modalTitle.id = 'confirmDeleteModalLabel';
    modalTitle.textContent = 'Confirmar Exclusão';
  
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('close');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
  
    const closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.innerHTML = '&times;';
  
    closeButton.appendChild(closeIcon);
    modalHeaderDiv.appendChild(modalTitle);
    modalHeaderDiv.appendChild(closeButton);
  
    const modalBodyDiv = document.createElement('div');
    modalBodyDiv.classList.add('modal-body');
    modalBodyDiv.innerHTML = '<p>Tem certeza de que deseja excluir este produto?</p>';
  
    const modalFooterDiv = document.createElement('div');
    modalFooterDiv.classList.add('modal-footer');
  
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.classList.add('btn', 'btn-default');
    cancelButton.setAttribute('data-dismiss', 'modal');
    cancelButton.textContent = 'Cancelar';
  
    const confirmButton = document.createElement('button');
    confirmButton.setAttribute('type', 'button');
    confirmButton.classList.add('btn', 'btn-danger');
    confirmButton.textContent = 'Excluir';
    confirmButton.addEventListener('click', async () => {
      try {
        // Faça a exclusão do produto aqui
        $('#confirmDeleteModal').modal('hide'); // Feche o modal de confirmação
        showAlert('Produto excluído com sucesso!'); // Mostre o alerta de sucesso
        // Atualize a tabela após a exclusão do produto (se necessário)
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    modalFooterDiv.appendChild(cancelButton);
    modalFooterDiv.appendChild(confirmButton);
  
    modalContentDiv.appendChild(modalHeaderDiv);
    modalContentDiv.appendChild(modalBodyDiv);
    modalContentDiv.appendChild(modalFooterDiv);
  
    modalDialogDiv.appendChild(modalContentDiv);
    modalDiv.appendChild(modalDialogDiv);
  
    document.body.appendChild(modalDiv);
  
    $('#confirmDeleteModal').modal('show');
  }
  
  // Função para adicionar evento de clique ao botão de exclusão
  function addDeleteButtonClickEvent() {
    const deleteButtons = document.querySelectorAll('.delete-product');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        createConfirmationModal(productId);
      });
    });
  }
  
  // Chame a função addDeleteButtonClickEvent na inicialização do documento
  document.addEventListener('DOMContentLoaded', addDeleteButtonClickEvent);
  