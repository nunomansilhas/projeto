import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

function createEditEmpressaModal() {
  const modalHtml = `
    <div class="modal fade" id="editEmpressaModal" tabindex="-1" role="dialog" aria-labelledby="editEmpressaModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="editEmpressaModalLabel">Editar Empresa</h4>
          </div>
          <div class="modal-body">
            <form id="editEmpressaForm">
              <div class="form-group">
                <label for="edit-contribuinte">Contribuinte</label>
                <input type="text" class="form-control" id="edit-contribuinte" name="contribuinte" required>
              </div>
              <div class="form-group">
                <label for="edit-endereco">Endereço</label>
                <input type="text" class="form-control" id="edit-endereco" name="endereco" required>
              </div>
              <div class="form-group">
                <label for="edit-cidade">Cidade</label>
                <input type="text" class="form-control" id="edit-cidade" name="cidade" required>
              </div>
              <div class="form-group">
                <label for="edit-telefone">Telefone</label>
                <input type="text" class="form-control" id="edit-telefone" name="telefone" required>
              </div>
              <div class="form-group">
                <label for="edit-email">Email</label>
                <input type="email" class="form-control" id="edit-email" name="email" required>
              </div>
              <button type="submit" class="btn btn-primary" id="saveEmpressaChanges">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

export function showEditEmpressaModal() {
  if (!document.getElementById('editEmpressaModal')) {
    createEditEmpressaModal();
  }

  const contribuinte = document.getElementById('empresa-contribuinte').textContent;
  const endereco = document.getElementById('empresa-endereco').textContent;
  const cidade = document.getElementById('empresa-cidade').textContent;
  const telefone = document.getElementById('empresa-telefone').textContent;
  const email = document.getElementById('empresa-email').textContent;

  document.getElementById('edit-contribuinte').value = contribuinte;
  document.getElementById('edit-endereco').value = endereco;
  document.getElementById('edit-cidade').value = cidade;
  document.getElementById('edit-telefone').value = telefone;
  document.getElementById('edit-email').value = email;

  document.getElementById('editEmpressaForm').addEventListener('submit', saveEmpressaChanges);

  $('#editEmpressaModal').modal('show');
}

async function saveEmpressaChanges(event) {
  event.preventDefault();

  const updatedEmpressa = {
    contribuinte: document.getElementById('edit-contribuinte').value,
    endereco: document.getElementById('edit-endereco').value,
    cidade: document.getElementById('edit-cidade').value,
    telefone: document.getElementById('edit-telefone').value,
    email: document.getElementById('edit-email').value,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/dadosEmpresa`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEmpressa)
    });

    if (!response.ok) throw new Error('Erro ao atualizar os dados da empresa');

    $('#editEmpressaModal').modal('hide');
    await enviarNotificacao('Editado', 'Os dados da empresa foram atualizados com sucesso.');
    window.location.reload();
  } catch (error) {
    alert(`Erro: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('edit-empressa-btn').addEventListener('click', showEditEmpressaModal);
});
