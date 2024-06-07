// Função para criar e injetar o HTML do modal de edição no DOM
function createEditModal() {
    const modalHtml = `
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title" id="editModalLabel">Editar Produto</h5>
            </div>
            <div class="modal-body">
              <form id="editProductForm">
                <div class="form-group">
                  <label for="idproduto" class="form-label">ID do Produto:</label>
                  <input type="text" class="form-control form-control-line" id="idproduto" name="idproduto" readonly required>
                </div>
                <div class="form-group">
                  <label for="nomeproduto" class="form-label">Nome do Produto:</label>
                  <input type="text" class="form-control form-control-line" id="nomeproduto" name="nomeproduto" required>
                </div>
                <div class="form-group">
                  <label for="descricao" class="form-label">Descrição:</label>
                  <textarea class="form-control form-control-line" rows="5" id="descricao" name="descricao"></textarea>
                </div>
                <div class="form-group">
                  <label for="tipoproduto" class="form-label">Tipo de Produto:</label>
                  <select class="selectpicker form-control form-control-line" data-live-search="true" id="tipoproduto" name="tipoproduto">
                    <option>Selecionar Opção</option>
                  </select>
                </div>
                <label class="form-label">Disponibilidade:</label>
                <div class="radio radio-info">
                  <input type="radio" id="inlineRadio1" value="Sim" name="disponibilidade">
                  <label for="inlineRadio1">Sim</label>
                </div>
                <div class="radio radio-danger">
                  <input type="radio" id="inlineRadio2" value="Não" name="disponibilidade">
                  <label for="inlineRadio2">Não</label>
                </div>
                <label class="form-label">Donativo:</label>
                <div class="radio radio-info">
                  <input type="radio" id="inlineRadio3" value="Sim" name="donativo">
                  <label for="inlineRadio3">Sim</label>
                </div>
                <div class="radio radio-danger">
                  <input type="radio" id="inlineRadio4" value="Não" name="donativo">
                  <label for="inlineRadio4">Não</label>
                </div>
                <label class="form-label">Quantidade:</label>
                <input type="number" class="form-control form-control-line" id="quantidade" name="quantidade">
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" id="saveChanges">Guardar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
  
  // Função para exibir o modal de edição com os dados do produto
  export function showEditModal(product, tiposProdutos) {
    // Cria o modal se ainda não existir
    if (!document.getElementById('editModal')) {
      createEditModal();
      document.getElementById('saveChanges').addEventListener('click', saveProductChanges);
    }
  
    document.getElementById('idproduto').value = product.ID;
    document.getElementById('nomeproduto').value = product.Nome;
    document.getElementById('descricao').value = product.Descricao || '';
    document.getElementById('quantidade').value = product.quantidade;
  
    // Configurar disponibilidade
    const disponibilidade = product.Disponibilidade === 'Sim' ? 'Sim' : 'Não';
    document.querySelector(`input[name="disponibilidade"][value="${disponibilidade}"]`).checked = true;
  
    // Configurar donativo
    const donativo = product.donativo === 'Sim' ? 'Sim' : 'Não';
    document.querySelector(`input[name="donativo"][value="${donativo}"]`).checked = true;
  
    const productTipoSelect = document.getElementById('tipoproduto');
    productTipoSelect.innerHTML = tiposProdutos.map(tipo => `
      <option value="${tipo.ID}" ${tipo.ID == product.TipoProdutoID ? 'selected' : ''}>${tipo.Nome}</option>
    `).join('');
  
    $('#editModal').modal('show');
  }
  
  // Função para salvar as alterações do produto
  async function saveProductChanges() {
    const updatedProduct = {
      id: document.getElementById('idproduto').value,
      nome: document.getElementById('nomeproduto').value,
      descricao: document.getElementById('descricao').value,
      tipoProdutoId: document.getElementById('tipoproduto').value,
      disponibilidade: document.querySelector('input[name="disponibilidade"]:checked').value,
      donativo: document.querySelector('input[name="donativo"]:checked').value,
      quantidade: document.getElementById('quantidade').value
    };
      
    try {
      const response = await fetch(`http://localhost:3000/api/produtos/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
  
      if (!response.ok) throw new Error('Erro ao atualizar o produto');
  
      $('#editModal').modal('hide');
      window.location.reload();
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  }
  
  export { saveProductChanges };
  