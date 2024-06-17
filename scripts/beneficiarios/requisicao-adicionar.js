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
                                <span id="quantidadeDisponivel" class="help-block">Disponível: 0</span>
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

    document.getElementById('produtoSelect').addEventListener('change', handleProdutoChange);
    document.getElementById('quantidadeInput').addEventListener('input', handleQuantidadeInput);
    document.getElementById('submitRequisicaoBtn').addEventListener('click', submitRequisicao);

    populateProdutoSelect();
}

async function populateProdutoSelect() {
    const produtoSelect = document.getElementById('produtoSelect');
    if (!produtoSelect) return;

    const response = await fetch('http://localhost:3000/api/produtos');
    const produtos = await response.json();

    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.ID;
        option.textContent = `${produto.Nome}`;
        option.dataset.quantidade = produto.quantidade; // Adiciona a quantidade como um data attribute
        produtoSelect.appendChild(option);
    });

    $('.selectpicker').selectpicker('refresh');
}

async function handleProdutoChange(event) {
    const produtoId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const quantidadeDisponivel = selectedOption.dataset.quantidade; // Obtém a quantidade disponível do data attribute
    document.getElementById('quantidadeDisponivel').textContent = `Disponível: ${quantidadeDisponivel}`;
}

function handleQuantidadeInput(event) {
    const quantidadeInput = event.target;
    const quantidadeDisponivel = parseInt(document.getElementById('quantidadeDisponivel').textContent.split(': ')[1]);

    if (quantidadeInput.value > quantidadeDisponivel) {
        quantidadeInput.classList.add('is-invalid');
    } else {
        quantidadeInput.classList.remove('is-invalid');
    }
}

async function submitRequisicao() {
    const produtoId = document.getElementById('produtoSelect').value;
    const quantidade = document.getElementById('quantidadeInput').value;
    const dataRange = document.getElementById('dataRangePicker').value;

    if (quantidade <= 0) {
        swal("Erro", "Quantidade deve ser maior que zero.", "error");
        return;
    }

    const requisicao = {
        ProdutoDeApoioID: produtoId,
        TipoMovimentacao: "requisicao",
        Quantidade: quantidade,
        DataMovimentacao: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
        DataEntrega: dataRange.split(' - ')[1], // Data final do range de datas
        FuncionarioID: getFuncionarioIdFromSession(), // Função para obter o ID do funcionário da sessão
        ClienteID: getClienteIdFromUrl() // Função para obter o ID do cliente da URL
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
        };
    }catch (error) {
        console.error('Error:', error);
    }
    
}

function getClienteIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
    showAddRequisicaoModal();
});
