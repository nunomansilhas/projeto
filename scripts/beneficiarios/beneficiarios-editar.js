import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para criar e injetar o HTML do modal de edição no DOM
function createEditBeneficiarioModal() {
    const modalHtml = `
      <div class="modal fade" id="editBeneficiaryModal" tabindex="-1" role="dialog" aria-labelledby="editBeneficiaryModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="editBeneficiaryModalLabel">Editar Beneficiário</h4>
                </div>
                <div class="modal-body">
                    <form id="editBeneficiaryForm">
                        <div class="form-group">
                            <label for="edit-id">ID</label>
                            <input type="text" class="form-control" id="edit-id" name="id" readonly>
                        </div>
                        <div class="form-group">
                            <label for="edit-nome">Nome</label>
                            <input type="text" class="form-control" id="edit-nome" name="nome" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-email">Email</label>
                            <input type="email" class="form-control" id="edit-email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-telefone">Telemóvel</label>
                            <input type="text" class="form-control" id="edit-telefone" name="telemovel" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-endereco">Morada</label>
                            <input type="text" class="form-control" id="edit-endereco" name="morada" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-imagem">Imagem de Perfil</label>
                            <input type="file" class="form-control" id="edit-imagem" name="image_profile" accept="image/*">
                        </div>
                        <button type="submit" class="btn btn-primary" id="saveBeneficiarioChanges">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Função para exibir o modal de edição com os dados do beneficiário
export function showEditBeneficiarioModal(beneficiario) {
    // Cria o modal se ainda não existir
    if (!document.getElementById('editBeneficiaryModal')) {
        createEditBeneficiarioModal();
    }

    const form = document.getElementById('editBeneficiaryForm');
    form.reset();

    document.getElementById('edit-id').value = beneficiario.id || '';
    document.getElementById('edit-nome').value = beneficiario.nome || '';
    document.getElementById('edit-email').value = beneficiario.email || '';
    document.getElementById('edit-telefone').value = beneficiario.telemovel || '';
    document.getElementById('edit-endereco').value = beneficiario.morada || '';

    form.removeEventListener('submit', saveBeneficiarioChanges);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await saveBeneficiarioChanges(beneficiario.image_profile);
    });

    $('#editBeneficiaryModal').modal('show');
}

// Função para salvar as alterações do beneficiário
async function saveBeneficiarioChanges(existingImage) {
    const updatedBeneficiario = {
        id: document.getElementById('edit-id').value,
        nome: document.getElementById('edit-nome').value,
        email: document.getElementById('edit-email').value,
        telemovel: document.getElementById('edit-telefone').value,
        morada: document.getElementById('edit-endereco').value
    };

    const formData = new FormData();
    formData.append('nome', updatedBeneficiario.nome);
    formData.append('email', updatedBeneficiario.email);
    formData.append('telemovel', updatedBeneficiario.telemovel);
    formData.append('morada', updatedBeneficiario.morada);

    const imageFile = document.getElementById('edit-imagem').files[0];
    if (imageFile) {
        formData.append('image_profile', imageFile);
    } else {
        formData.append('existing_image', existingImage); // Mantém a imagem existente se nenhuma nova imagem for fornecida
    }

    console.log('Updated Beneficiario:', updatedBeneficiario); // Log para verificar os dados

    try {
        const response = await fetch(`http://localhost:3000/api/clientes/${updatedBeneficiario.id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) throw new Error('Erro ao atualizar o beneficiário');

        $('#editBeneficiaryModal').modal('hide');
        await enviarNotificacao('Editado', `Editou o Beneficiário ${updatedBeneficiario.nome} com ID:(${updatedBeneficiario.id})`);
        window.location.reload();
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

export { saveBeneficiarioChanges };
