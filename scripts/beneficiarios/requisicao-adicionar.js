import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchProdutosSolicitacao();
    fetchClientesSolicitacao();
    document.getElementById('addSolicitacaoForm').addEventListener('submit', handleSolicitacaoSubmit);
});

async function fetchProdutosSolicitacao() {
    try {
        const produtosResponse = await fetch('http://localhost:3000/api/produtos');
        if (!produtosResponse.ok) throw new Error('Erro ao buscar produtos');
        const produtos = await produtosResponse.json();
        populateProdutosDropdownSolicitacao(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function populateProdutosDropdownSolicitacao(produtos) {
    const dropdown = document.getElementById('produtoSolicitacao');
    dropdown.innerHTML = '<option value="" selected disabled>Selecione um produto...</option>';
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.ID;
        option.textContent = produto.Nome;
        dropdown.appendChild(option);
    });
    $('#produtoSolicitacao').selectpicker('refresh');
}

async function fetchClientesSolicitacao() {
    try {
        const clientesResponse = await fetch('http://localhost:3000/api/clientes');
        if (!clientesResponse.ok) throw new Error('Erro ao buscar clientes');
        const clientes = await clientesResponse.json();
        populateClientesDropdownSolicitacao(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
}

function populateClientesDropdownSolicitacao(clientes) {
    const dropdown = document.getElementById('clienteSolicitacao');
    dropdown.innerHTML = '<option value="" selected disabled>Selecione um cliente...</option>';
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        dropdown.appendChild(option);
    });
    $('#clienteSolicitacao').selectpicker('refresh');
}

async function handleSolicitacaoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const funcionarioId = await getFuncionarioIdFromSession();
    const produtoId = formData.get('produto');
    const clienteId = formData.get('cliente');
    const quantidade = parseInt(formData.get('quantidade'), 10);
    const dataSolicitacao = formData.get('dataSolicitacao');
    const dataEntrega = formData.get('dataEntrega');

    try {
        const response = await fetch('http://localhost:3000/api/movimentacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProdutoDeApoioID: produtoId,
                TipoMovimentacao: 'Saída',
                Quantidade: quantidade,
                DataMovimentacao: dataSolicitacao,
                DataEntrega: dataEntrega,
                FuncionarioID: funcionarioId,
                ClienteID: clienteId
            })
        });

        if (!response.ok) throw new Error('Erro ao adicionar solicitação');
        await enviarNotificacao('Adicionado', `Adicionou uma solicitação com o produto ID: ${produtoId}`);
        swal("Sucesso", "Solicitação adicionada com sucesso!", "success");
        window.location.href = 'solicitacoes.html';
    } catch (error) {
        console.error('Erro ao adicionar solicitação:', error);
        swal("Erro", "Ocorreu um erro ao adicionar a solicitação.", "error");
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
