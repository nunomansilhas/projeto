import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showAddRequisicaoModal() {
    // Cria o modal se ainda não existir
    if (!document.getElementById('addRequisicaoModal')) {
        createAddRequisicaoModal();
        fetchProdutosRequisicao(); // Preenche o dropdown de produtos
    }

    $('#addRequisicaoModal').modal('show');
}

function createAddRequisicaoModal() {
    const modalHtml = `
      <div class="modal fade" id="addRequisicaoModal" tabindex="-1" role="dialog" aria-labelledby="addRequisicaoModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addRequisicaoModalLabel">Nova Requisição</h4>
                </div>
                <div class="modal-body">
                    <form id="addRequisicaoForm">
                        <div class="form-group">
                            <label for="produtoRequisicao">Produto</label>
                            <select class="selectpicker" id="produtoRequisicao" name="produto" data-live-search="true" required></select>
                        </div>
                        <div class="form-group">
                            <label for="quantidadeRequisicao">Quantidade</label>
                            <input type="number" class="form-control" id="quantidadeRequisicao" name="quantidade" required>
                        </div>
                        <div class="form-group">
                            <label for="date-range-picker-requisicao">Data da Requisição e Entrega Prevista</label>
                            <div class="input-prepend input-group">
                                <span class="add-on input-group-addon"><i class="fa fa-calendar"></i></span>
                                <input type="text" id="date-range-picker-requisicao" class="form-control" name="date-range-picker" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('addRequisicaoForm').addEventListener('submit', handleRequisicaoSubmit);

    // Initialize date range picker
    $('#date-range-picker-requisicao').daterangepicker({
        locale: {
            format: 'MM/DD/YYYY'
        }
    });
}

async function fetchProdutosRequisicao() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        const produtos = await response.json();
        populateProdutosDropdownRequisicao(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function populateProdutosDropdownRequisicao(produtos) {
    const dropdown = document.getElementById('produtoRequisicao');
    dropdown.innerHTML = '<option value="" selected disabled>Selecione um produto...</option>';
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.ID;
        option.textContent = produto.Nome;
        dropdown.appendChild(option);
    });
    $('.selectpicker').selectpicker('refresh');
}

async function handleRequisicaoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const produtoId = formData.get('produto');
    const quantidade = formData.get('quantidade');
    const dateRange = formData.get('date-range-picker').split(' - ');
    const dataRequisicao = dateRange[0];
    const dataEntregaPrevista = dateRange[1];

    try {
        const response = await fetch('http://localhost:3000/api/requisicoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId, quantidade, dataRequisicao, dataEntregaPrevista })
        });

        if (!response.ok) throw new Error('Erro ao adicionar requisição');
        await enviarNotificacao('Adicionado', `Adicionou uma requisição com o produto ID: ${produtoId}`);
        swal("Sucesso", "Requisição adicionada com sucesso!", "success");
        $('#addRequisicaoModal').modal('hide');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao adicionar requisição:', error);
        swal("Erro", "Ocorreu um erro ao adicionar a requisição.", "error");
    }
}
