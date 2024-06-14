import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para criar e injetar o HTML do modal de adição no DOM
function createAddCategoriaModal() {
    const modalHtml = `
      <div class="modal fade" id="addCategoriaModal" tabindex="-1" role="dialog" aria-labelledby="addCategoriaModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addCategoriaModalLabel">Nova Categoria</h4>
                </div>
                <div class="modal-body">
                    <form id="addCategoriaForm">
                        <div class="form-group">
                            <label for="categoria-nome">Nome da Categoria</label>
                            <input type="text" class="form-control" id="categoria-nome" name="nome" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="saveCategoria">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Função para exibir o modal de adição
function showAddCategoriaModal() {
    // Cria o modal se ainda não existir
    if (!document.getElementById('addCategoriaModal')) {
        createAddCategoriaModal();
    }

    document.getElementById('addCategoriaForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const categoriaNome = document.getElementById('categoria-nome').value;

        try {
            const response = await fetch('http://localhost:3000/api/tiposprodutos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: categoriaNome })
            });

            if (!response.ok) throw new Error('Erro ao adicionar a categoria');

            const result = await response.json();
            await enviarNotificacao('Criado', `Adicionou a nova categoria: ${categoriaNome}`);
            $('#addCategoriaModal').modal('hide');
            window.location.reload();
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    });

    $('#addCategoriaModal').modal('show');
}

// Adicionar evento ao botão de adicionar categoria
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.categoria-adicionar').addEventListener('click', showAddCategoriaModal);
});

export { showAddCategoriaModal };
