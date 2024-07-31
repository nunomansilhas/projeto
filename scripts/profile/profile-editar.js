import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

function createEditFuncionarioModal() {
  const modalHtml = `
    <div class="modal fade" id="editFuncionarioModal" tabindex="-1" role="dialog" aria-labelledby="editFuncionarioModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="editFuncionarioModalLabel">Editar Funcionário</h4>
          </div>
          <div class="modal-body">
            <form id="editFuncionarioForm">
              <div class="form-group">
                <label for="edit-id">ID</label>
                <input type="text" class="form-control" id="edit-id" name="id" readonly>
              </div>
              <div class="form-group">
                <label for="edit-nome">Nome</label>
                <input type="text" class="form-control" id="edit-nome" name="nome" required>
              </div>
              <div class="form-group">
                <label for="edit-username">Nome de Utilizador</label>
                <input type="text" class="form-control" id="edit-username" name="username" required>
              </div>
              <div class="form-group">
                <label for="edit-email">Email</label>
                <input type="email" class="form-control" id="edit-email" name="email" required>
              </div>
              <div class="form-group">
                <label for="edit-cargo">Cargo</label>
                <div class="radio">
                  <input type="radio" id="cargoAdmin" value="Administrador" name="cargo" required>
                  <label for="cargoAdmin">Administrador</label>
                </div>
                <div class="radio">
                  <input type="radio" id="cargoGestor" value="Gestor" name="cargo">
                  <label for="cargoGestor">Gestor</label>
                </div>
                <div class="radio">
                  <input type="radio" id="cargoFuncionario" value="Assistente" name="cargo">
                  <label for="cargoFuncionario">Assistente</label>
                </div>
              </div>
              <div class="form-group">
                <label for="edit-imagem">Imagem de Perfil</label>
                <input type="file" class="form-control" id="edit-imagem" name="profileImg" accept="image/*">
              </div>
              <button type="submit" class="btn btn-primary" id="saveFuncionarioChanges">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

export function showEditFuncionarioModal(funcionario) {
  if (!document.getElementById('editFuncionarioModal')) {
    createEditFuncionarioModal();
  }

  document.getElementById('edit-id').value = funcionario.id || '';
  document.getElementById('edit-nome').value = funcionario.nome || '';
  document.getElementById('edit-username').value = funcionario.username || '';
  document.getElementById('edit-email').value = funcionario.email || '';

  // Definir o cargo, verificando se o elemento existe
  const cargoElement = document.querySelector(`input[name="cargo"][value="${funcionario.cargo}"]`);
  if (cargoElement) {
    cargoElement.checked = true;
  } else {
    console.error(`Valor de cargo desconhecido: ${funcionario.cargo}`);
  }

  document.getElementById('editFuncionarioForm').addEventListener('submit', saveFuncionarioChanges);

  $('#editFuncionarioModal').modal('show');
}

async function saveFuncionarioChanges(event) {
  event.preventDefault();

  const updatedFuncionario = {
    id: document.getElementById('edit-id').value,
    nome: document.getElementById('edit-nome').value,
    username: document.getElementById('edit-username').value,
    email: document.getElementById('edit-email').value,
    cargo: document.querySelector('input[name="cargo"]:checked').value
  };

  const formData = new FormData();
  formData.append('nome', updatedFuncionario.nome);
  formData.append('username', updatedFuncionario.username);
  formData.append('email', updatedFuncionario.email);
  formData.append('cargo', updatedFuncionario.cargo);

  const imageFile = document.getElementById('edit-imagem').files[0];
  if (imageFile) {
    formData.append('profileImg', imageFile);
  }

  try {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${updatedFuncionario.id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) throw new Error('Erro ao atualizar o funcionário');

    // Atualizar a sessão do usuário após a atualização bem-sucedida
    await updateUserSession(updatedFuncionario);

    $('#editFuncionarioModal').modal('hide');
    await enviarNotificacao('Editado', `Editou o Funcionário ${updatedFuncionario.nome} com ID:(${updatedFuncionario.id})`);
    window.location.reload();
  } catch (error) {
    alert(`Erro: ${error.message}`);
  }
}

// Função para atualizar a sessão do usuário
async function updateUserSession(updatedFuncionario) {
  try {
    const response = await fetch('http://localhost:3000/api/login/update-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFuncionario),
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Erro ao atualizar a sessão do usuário');
  } catch (error) {
    console.error('Erro ao atualizar a sessão do usuário:', error);
  }
}

export { saveFuncionarioChanges };

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('edit-funcionario-btn').addEventListener('click', () => {
    const funcionario = {
      id: document.getElementById('edit-funcionario-btn').dataset.funcionarioId,
      nome: document.getElementById('edit-funcionario-btn').dataset.funcionarioName,
      username: document.getElementById('funcionario-username').textContent,
      email: document.getElementById('funcionario-email').textContent,
      cargo: document.getElementById('funcionario-cargo').textContent
    };
    showEditFuncionarioModal(funcionario);
  });
});
