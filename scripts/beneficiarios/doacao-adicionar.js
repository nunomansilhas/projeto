import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showAddDoacaoModal() {
    if (!document.getElementById('addDoacaoModal')) {
        createAddDoacaoModal();
        fetchProdutosDoacao();
    }
    $('#addDoacaoModal').modal('show');
}

function createAddDoacaoModal() {
    const modalHtml = `
        <div class="modal fade" id="addDoacaoModal" tabindex="-1" role="dialog" aria-labelledby="addDoacaoModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="addDoacaoModalLabel">Adicionar Doação</h4>
                    </div>
                    <div class="modal-body">
                        <form id="addDoacaoForm" class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label form-label" for="produtoDoacao">Produto</label>
                                <div class="col-sm-10">
                                    <select class="selectpicker" id="produtoDoacao" name="produto" data-live-search="true" required></select>
                                </div>
                            </div>
                            <div id="quickAddProdutoDoacao" style="display:none;">
                                <h5>Adicionar Novo Produto</h5>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label form-label" for="novoProdutoIDDoacao">ID</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="novoProdutoIDDoacao" name="novoProdutoID">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label form-label" for="novoProdutoNomeDoacao">Nome</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="novoProdutoNomeDoacao" name="novoProdutoNome">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label form-label" for="novoProdutoTipoDoacao">Categoria</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" id="novoProdutoTipoDoacao" name="novoProdutoTipo" required></select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label form-label" for="quantidadeDoacao">Quantidade</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" id="quantidadeDoacao" name="quantidade" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label form-label" for="dataDoacao">Data da Doação</label>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" id="dataDoacao" name="dataDoacao" required>
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
    document.getElementById('addDoacaoForm').addEventListener('submit', handleDoacaoSubmit);

    $('#produtoDoacao').on('change', function () {
        const quickAddSection = document.getElementById('quickAddProdutoDoacao');
        const novoProdutoTipo = document.getElementById('novoProdutoTipoDoacao');
        if (this.value === "novo") {
            quickAddSection.style.display = 'block';
            novoProdutoTipo.setAttribute('required', 'true');
        } else {
            quickAddSection.style.display = 'none';
            novoProdutoTipo.removeAttribute('required');
        }
    });
}

async function fetchProdutosDoacao() {
    try {
        const produtosResponse = await fetch('http://localhost:3000/api/produtos');
        if (!produtosResponse.ok) throw new Error('Erro ao buscar produtos');
        const produtos = await produtosResponse.json();
        populateProdutosDropdownDoacao(produtos);

        const tiposProdutosResponse = await fetch('http://localhost:3000/api/tiposprodutos');
        if (!tiposProdutosResponse.ok) throw new Error('Erro ao buscar tipos de produtos');
        const tiposProdutos = await tiposProdutosResponse.json();
        populateTiposProdutosDropdown(tiposProdutos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function populateProdutosDropdownDoacao(produtos) {
    const dropdown = document.getElementById('produtoDoacao');
    dropdown.innerHTML = '<option value="" selected disabled>Selecione um produto...</option>';
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.ID;
        option.textContent = produto.Nome;
        dropdown.appendChild(option);
    });
    const optionNovo = document.createElement('option');
    optionNovo.value = "novo";
    optionNovo.textContent = "Adicionar novo produto";
    dropdown.appendChild(optionNovo);
    $('.selectpicker').selectpicker('refresh');
}

function populateTiposProdutosDropdown(tiposProdutos) {
    const dropdown = document.getElementById('novoProdutoTipoDoacao');
    dropdown.innerHTML = '<option value="" selected disabled>Selecione uma categoria...</option>';
    tiposProdutos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.ID;
        option.textContent = tipo.Nome;
        dropdown.appendChild(option);
    });
}

async function handleDoacaoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const produtoId = formData.get('produto');
    const quantidade = parseInt(formData.get('quantidade'), 10);
    const dataDoacao = formData.get('dataDoacao');

    if (produtoId === "novo") {
        // Adicionar novo produto
        const novoProdutoID = formData.get('novoProdutoID');
        const novoProdutoNome = formData.get('novoProdutoNome');
        const novoProdutoTipo = formData.get('novoProdutoTipo');

        try {
            const response = await fetch('http://localhost:3000/api/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idProduto: novoProdutoID, nome: novoProdutoNome, tipoProdutoId: novoProdutoTipo, quantidade: 0 })
            });

            if (!response.ok) throw new Error('Erro ao adicionar novo produto');
            const novoProduto = await response.json();
            await adicionarDoacao(novoProduto.ID, quantidade, dataDoacao);
        } catch (error) {
            console.error('Erro ao adicionar novo produto:', error);
            swal("Erro", "Ocorreu um erro ao adicionar o novo produto.", "error");
        }
    } else {
        // Atualizar quantidade do produto existente
        try {
            const produtoResponse = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
            if (!produtoResponse.ok) throw new Error('Erro ao buscar produto existente');
            const produtoExistente = await produtoResponse.json();
            const novaQuantidade = produtoExistente.quantidade + quantidade;

            await fetch(`http://localhost:3000/api/produtos/quantidade/${produtoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantidade: novaQuantidade })
            });

            await adicionarDoacao(produtoId, quantidade, dataDoacao);
        } catch (error) {
            console.error('Erro ao atualizar quantidade do produto existente:', error);
            swal("Erro", "Ocorreu um erro ao atualizar a quantidade do produto existente.", "error");
        }
    }
}

async function adicionarDoacao(produtoId, quantidade, dataDoacao) {
    const clienteId = getBeneficiarioIdFromUrl();
    try {
        const response = await fetch('http://localhost:3000/api/doacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ProdutoID: produtoId, ClienteID: clienteId, Quantidade: quantidade, DataDoacao: dataDoacao })
        });

        if (!response.ok) throw new Error('Erro ao adicionar doação');
        await enviarNotificacao('Adicionado', `Adicionou uma doação com o produto ID: ${produtoId}`);
        swal("Sucesso", "Doação adicionada com sucesso!", "success");
        $('#addDoacaoModal').modal('hide');
        //window.location.reload();
    } catch (error) {
        console.error('Erro ao adicionar doação:', error);
        swal("Erro", "Ocorreu um erro ao adicionar a doação.", "error");
    }
}

function getBeneficiarioIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
