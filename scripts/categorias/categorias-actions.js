import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

function createEditCategoriaModal() {
    const modalHtml = `
      <div class="modal fade" id="editCategoriaModal" tabindex="-1" role="dialog" aria-labelledby="editCategoriaModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="editCategoriaModalLabel">Editar Categoria</h4>
                </div>
                <div class="modal-body">
                    <form id="editCategoriaForm">
                        <div class="form-group">
                            <label for="edit-nome">Nome</label>
                            <input type="text" class="form-control" id="edit-nome" name="nome" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="saveCategoriaChanges">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

export async function showEditCategoriaModal(categoriaId) {
    if (!document.getElementById('editCategoriaModal')) {
        createEditCategoriaModal();
    }

    try {
        const response = await fetch(`http://localhost:3000/api/tiposprodutos/${categoriaId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da categoria');
        }
        const categoria = await response.json();
        document.getElementById('edit-nome').value = categoria.nome || '';
    } catch (error) {
        console.error('Erro ao buscar os dados da categoria:', error);
        swal("Erro", "Ocorreu um erro ao buscar os dados da categoria.", "error");
        return;
    }

    document.getElementById('editCategoriaForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedNome = document.getElementById('edit-nome').value;

        try {
            const response = await fetch(`http://localhost:3000/api/tiposprodutos/${categoriaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: updatedNome })
            });

            if (!response.ok) throw new Error('Erro ao atualizar a categoria');

            $('#editCategoriaModal').modal('hide');
            await enviarNotificacao('Editado', `Editou a Categoria ${updatedNome}`);
            window.location.reload();
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    });

    $('#editCategoriaModal').modal('show');
}

export async function handleDelete(event) {
    event.preventDefault();
    const categoriaId = event.currentTarget.dataset.categoriaId;
    const categoriaNome = event.currentTarget.dataset.categoriaName;
    const confirmed = await confirmDelete();
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3000/api/tiposprodutos/${categoriaId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Falha ao excluir a categoria com ID: ${categoriaId}`);
            }
            await enviarNotificacao('Eliminado', `Eliminou a Categoria: ${categoriaNome}`);
            swal("Eliminado!", "A categoria foi excluída com sucesso.", "success");
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            swal("Erro", "Ocorreu um erro ao excluir a categoria.", "error");
        }
    }
}

async function confirmDelete() {
    return new Promise((resolve) => {
        swal({
            title: "Tem certeza?",
            text: "Esta ação não pode ser desfeita!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            resolve(isConfirm);
        });
    });
}
