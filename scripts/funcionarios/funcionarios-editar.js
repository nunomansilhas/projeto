import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para criar e injetar o HTML do modal de edição no DOM
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
                            <label for="edit-username">Nome de Usuário</label>
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

// Função para exibir o modal de edição com os dados do funcionário
export function showEditFuncionarioModal(funcionario) {
    // Cria o modal se ainda não existir
    if (!document.getElementById('editFuncionarioModal')) {
        createEditFuncionarioModal();
    }

    document.getElementById('edit-id').value = funcionario.ID || '';
    document.getElementById('edit-nome').value = funcionario.Nome || '';
    document.getElementById('edit-username').value = funcionario.username || '';
    document.getElementById('edit-email').value = funcionario.Email || '';
    document.querySelector(`input[name="cargo"][value="${funcionario.Cargo}"]`).checked = true;

    document.getElementById('editFuncionarioForm').addEventListener('submit', saveFuncionarioChanges);

    $('#editFuncionarioModal').modal('show');
}

// Função para salvar as alterações do funcionário
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

    console.log('Updated Funcionario:', updatedFuncionario); // Log para verificar os dados

    try {
        const response = await fetch(`http://localhost:3000/api/funcionarios/${updatedFuncionario.id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) throw new Error('Erro ao atualizar o funcionário');

        $('#editFuncionarioModal').modal('hide');
        await enviarNotificacao('Editado', `Editou o Funcionário ${updatedFuncionario.nome} com ID:(${updatedFuncionario.id})`);
        window.location.reload();
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

export { saveFuncionarioChanges };
