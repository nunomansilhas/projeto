import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showAddRequisicaoModal() {
    if (!document.getElementById('addRequisicaoModal')) {
        createAddRequisicaoModal();
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
                        <form id="requisicaoForm">
                            <div class="form-group">
                                <label for="produtoSelect">Produto</label>
                                <select class="form-control selectpicker" id="produtoSelect" name="produtoSelect" data-live-search="true">
                                    <option value="" disabled selected>Selecione um Produto...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quantidadeInput">Quantidade</label>
                                <input type="number" class="form-control" id="quantidadeInput" name="quantidade" min="1">
                            </div>
                            <div class="form-group">
                                <label for="dataRangePicker">Período da Requisição</label>
                                <input type="text" class="form-control" id="dataRangePicker" name="dataRangePicker">
                            </div>
                            <button type="button" class="btn btn-primary" id="submitRequisicaoBtn">Adicionar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    $('.selectpicker').selectpicker();

    const startDate = moment();
    const endDate = moment().add(7, 'days');
    $('#dataRangePicker').daterangepicker({
        locale: {
            format: 'MM/DD/YYYY'
        },
        startDate: startDate,
        endDate: endDate
    });

    $('#dataRangePicker').val(`${startDate.format('MM/DD/YYYY')} - ${endDate.format('MM/DD/YYYY')}`);

    document.getElementById('submitRequisicaoBtn').addEventListener('click', submitRequisicao);

    populateProdutoSelect();
}

async function populateProdutoSelect() {
    const produtoSelect = document.getElementById('produtoSelect');
    if (!produtoSelect) return;

    const response = await fetch('http://localhost:3000/api/produtos');
    const produtos = await response.json();

    produtos.forEach(produto => {
        console.log("Produto:", produto); // Log para depuração
        const option = document.createElement('option');
        option.value = produto.ID;
        option.textContent = `${produto.Nome} - Disponível: ${produto.quantidade}`; // Mostrar quantidade no select
        option.dataset.quantidade = produto.quantidade; // Adiciona a quantidade como um data attribute
        produtoSelect.appendChild(option);
    });

    $('.selectpicker').selectpicker('refresh');
}

async function submitRequisicao() {
    const produtoId = document.getElementById('produtoSelect').value;
    const quantidade = parseInt(document.getElementById('quantidadeInput').value);
    const dataRange = document.getElementById('dataRangePicker').value;
    const selectedOption = document.querySelector(`#produtoSelect option[value="${produtoId}"]`);
    const quantidadeDisponivel = parseInt(selectedOption.dataset.quantidade);

    if (quantidade <= 0 || quantidade > quantidadeDisponivel) {
        swal("Erro", "Quantidade deve ser maior que zero e não pode exceder a quantidade disponível.", "error");
        return;
    }

    const funcionarioId = await getFuncionarioIdFromSession();
    const clienteId = getClienteIdFromUrl();

    const requisicao = {
        ProdutoDeApoioID: produtoId,
        TipoMovimentacao: "Saída",
        Quantidade: quantidade,
        DataMovimentacao: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
        DataEntrega: dataRange.split(' - ')[1], // Data final do range de datas
        FuncionarioID: funcionarioId,
        ClienteID: clienteId
    };

    try {
        const response = await fetch('http://localhost:3000/api/movimentacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requisicao)
        });

        if (!response.ok) throw new Error('Erro ao adicionar requisição');

        await atualizarQuantidadeProduto(produtoId, quantidade);

        await enviarNotificacao('Requisição Efetuada', `Funcionário - ID: ${funcionarioId} efetuou a requisição do PA - ID: ${produtoId} para o Beneficiário - ID: ${clienteId}`);

        swal("Sucesso", "Requisição adicionada com sucesso!", "success");

        $('#addRequisicaoModal').modal('hide');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao adicionar requisição:', error);
        swal("Erro", "Ocorreu um erro ao adicionar a requisição.", "error");
    }
}

async function getFuncionarioIdFromSession() {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            credentials: 'include' // Necessário para enviar cookies de sessão
        });

        if (!response.ok) {
            throw new Error('Not authenticated');
        }

        const data = await response.json();
        if (data.user) {
            return data.user.id;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return null;
}

function getClienteIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function atualizarQuantidadeProduto(produtoId, quantidade) {
    try {
        const produtoResponse = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
        if (!produtoResponse.ok) throw new Error('Erro ao buscar produto existente');
        const produtoExistente = await produtoResponse.json();
        const novaQuantidade = produtoExistente.quantidade - quantidade;

        if (novaQuantidade < 0) {
            throw new Error('A quantidade não pode ser inferior a zero.');
        }

        const response = await fetch(`http://localhost:3000/api/produtos/quantidade/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });

        if (!response.ok) throw new Error('Erro ao atualizar quantidade do produto');
    } catch (error) {
        console.error('Erro ao atualizar quantidade do produto:', error);
        throw error; // Propaga o erro para o chamador
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add-requisicao').addEventListener('click', showAddRequisicaoModal);
});
