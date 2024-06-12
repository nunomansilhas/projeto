import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação
import { showEditBeneficiarioModal } from './beneficiarios-editar.js'; // Importar a função de edição
import { confirmDelete, deleteBeneficiary } from './beneficiario-eliminar.js'; // Importar a função de exclusão

async function fetchBeneficiario(id) {
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados do beneficiário');
    }
    return response.json();
}

async function fetchMovimentacoes() {
    const response = await fetch(`http://localhost:3000/api/movimentacoes`);
    if (!response.ok) {
        throw new Error('Erro ao buscar as movimentações de inventário');
    }
    return response.json();
}

async function fetchDoacoes(id) {
    const response = await fetch(`http://localhost:3000/api/doacoes/cliente/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar as doações');
    }
    return response.json();
}

async function fetchProdutoData(produtoId) {
    const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do produto');
    return response.json();
}

async function fetchTiposProdutos() {
    const response = await fetch(`http://localhost:3000/api/tiposprodutos`);
    if (!response.ok) throw new Error('Erro ao buscar tipos de produtos');
    return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
    return response.json();
}

async function populateBeneficiarioData(id) {
    try {
        const beneficiario = await fetchBeneficiario(id);
        document.getElementById('beneficiario-nome').textContent = beneficiario.nome;
        document.getElementById('beneficiario-email').textContent = beneficiario.email;
        document.getElementById('beneficiario-telefone').textContent = beneficiario.telemovel;
        document.getElementById('beneficiario-endereco').textContent = beneficiario.morada;
        document.getElementById('beneficiario-imagem').src = beneficiario.image_profile;
        document.querySelector('.edit-beneficiario').dataset.beneficiarioId = beneficiario.id;
        document.querySelector('.edit-beneficiario').dataset.beneficiarioName = beneficiario.nome;
        document.querySelector('.delete-beneficiario').dataset.beneficiarioId = beneficiario.id;
        document.querySelector('.delete-beneficiario').dataset.beneficiarioName = beneficiario.nome;
    } catch (error) {
        console.error('Erro ao popular os dados do beneficiário:', error);
        swal("Erro", "Ocorreu um erro ao carregar os dados do beneficiário.", "error");
    }
}

async function populateMovimentacoesTable(movimentacoes) {
    try {
        const tableBody = document.querySelector('#movimentacoesTable tbody');
        tableBody.innerHTML = ''; // Limpa as linhas existentes

        for (const movimentacao of movimentacoes) {
            const produtoData = await fetchProdutoData(movimentacao.ProdutoDeApoioID);
            const funcionarioData = await fetchFuncionarioData(movimentacao.FuncionarioID);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movimentacao.ID}</td>
                <td>(ID: ${produtoData.ID || 'ID Desconhecido'}) ${produtoData.Nome || 'Produto Desconhecido'}</td>
                <td>${funcionarioData.Nome || 'Funcionario Desconhecido'}</td>
                <td>${new Date(movimentacao.DataMovimentacao).toLocaleDateString()}</td>
                <td>${movimentacao.Quantidade}</td>
                <td>${movimentacao.TipoMovimentacao}</td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Erro ao popular a tabela de movimentações:', error);
        swal("Erro", "Ocorreu um erro ao carregar as movimentações de inventário.", "error");
    }
}

async function populateMovimentacoes(id) {
    try {
        const movimentacoes = await fetchMovimentacoes();
        const beneficiarioMovimentacoes = movimentacoes.filter(mov => mov.ClienteID == id); // Filtrar pelas movimentações do beneficiário
        await populateMovimentacoesTable(beneficiarioMovimentacoes);
    } catch (error) {
        console.error('Erro ao buscar as movimentações de inventário:', error);
        swal("Erro", "Ocorreu um erro ao buscar as movimentações de inventário.", "error");
    }
}

async function populateDoacoesTable(doacoes, tiposProdutos) {
    try {
        const tableBody = document.querySelector('#doacoesTableBody');
        tableBody.innerHTML = ''; // Limpa as linhas existentes

        for (const doacao of doacoes) {
            const produtoData = await fetchProdutoData(doacao.ProdutoID);
            const tipoProduto = tiposProdutos.find(tipo => tipo.ID === produtoData.TipoProdutoID);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produtoData.ID}</td>
                <td>${produtoData.Nome || 'Produto Desconhecido'}</td>
                <td>${tipoProduto ? tipoProduto.Nome : 'Categoria Desconhecida'}</td>
                <td>${doacao.Quantidade}</td>
                <td>${new Date(doacao.DataDoacao).toLocaleDateString()}</td>
                <td><a href="#" type="button" class="btn btn-square">Ver Mais</a></td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Erro ao popular a tabela de doações:', error);
        swal("Erro", "Ocorreu um erro ao carregar as doações.", "error");
    }
}

async function populateDoacoes(id) {
    try {
        const doacoes = await fetchDoacoes(id);
        const tiposProdutos = await fetchTiposProdutos();
        await populateDoacoesTable(doacoes, tiposProdutos);
    } catch (error) {
        console.error('Erro ao buscar as doações:', error);
        swal("Erro", "Ocorreu um erro ao buscar as doações.", "error");
    }
}

// Função para lidar com a exclusão
async function handleDelete(event) {
    event.preventDefault();
    const beneficiarioId = event.currentTarget.dataset.beneficiarioId;
    const beneficiarioNome = event.currentTarget.dataset.beneficiarioName;
    const confirmed = await confirmDelete();
    if (confirmed) {
        await deleteBeneficiary(beneficiarioId, beneficiarioNome);
        window.location.href = 'beneficiarios.html';
    }
}

// Get beneficiario ID from URL
function getBeneficiarioIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Populate data when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
    const beneficiarioId = getBeneficiarioIdFromUrl();
    if (beneficiarioId) {
        await populateBeneficiarioData(beneficiarioId);
        await populateMovimentacoes(beneficiarioId);
        await populateDoacoes(beneficiarioId);
        
        // Adicionar eventos de clique para editar e excluir
        document.querySelector('.edit-beneficiario').addEventListener('click', async () => {
            const beneficiario = await fetchBeneficiario(beneficiarioId);
            showEditBeneficiarioModal(beneficiario);
        });
        document.querySelector('.delete-beneficiario').addEventListener('click', handleDelete);
    } else {
        swal("Erro", "ID do beneficiário não encontrado na URL.", "error");
    }
});
