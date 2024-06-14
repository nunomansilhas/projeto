import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para criar e injetar o HTML do modal de alteração de senha no DOM
function createEditPasswordModal() {
    const modalHtml = `
      <div class="modal fade" id="editPasswordModal" tabindex="-1" role="dialog" aria-labelledby="editPasswordModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="editPasswordModalLabel">Alterar Password</h4>
                </div>
                <div class="modal-body">
                    <form id="editPasswordForm">
                        <div class="form-group">
                            <label for="edit-password">Nova Password</label>
                            <input type="password" class="form-control" id="edit-password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="savePasswordChanges">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Função para exibir o modal de alteração de senha
export function showEditPasswordModal(funcionario) {
    // Cria o modal se ainda não existir
    if (!document.getElementById('editPasswordModal')) {
        createEditPasswordModal();
    }

    document.getElementById('editPasswordForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const newPassword = document.getElementById('edit-password').value;

        try {
            const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionario.ID}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senha: newPassword })
            });

            if (!response.ok) throw new Error('Erro ao alterar a senha');

            $('#editPasswordModal').modal('hide');
            await enviarNotificacao('Editado', `Alterou a senha do Funcionário ${funcionario.Nome} com ID:(${funcionario.ID})`);
            window.location.reload();
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    });

    $('#editPasswordModal').modal('show');
}
