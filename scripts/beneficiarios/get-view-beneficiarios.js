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

async function populateBeneficiarioData(id) {
    try {
        const beneficiario = await fetchBeneficiario(id);
        document.getElementById('beneficiario-id').textContent = beneficiario.ID;
        document.getElementById('beneficiario-nome').textContent = beneficiario.Nome;
        document.getElementById('beneficiario-email').textContent = beneficiario.Email;
        document.getElementById('beneficiario-telefone').textContent = beneficiario.Telemovel;
        document.getElementById('beneficiario-endereco').textContent = beneficiario.Morada;
        document.getElementById('beneficiario-imagem').src = beneficiario.image_profile; // Corrigir para atribuir a URL da imagem
    } catch (error) {
        console.error('Erro ao popular os dados do beneficiário:', error);
        swal("Erro", "Ocorreu um erro ao carregar os dados do beneficiário.", "error");
    }
}

async function fetchProdutoData(produtoId) {
    const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do produto');
    return response.json();
  }

  async function fetchFuncionarioData(funcionarioId) {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
    return response.json();
  }

async function populateMovimentacoesTable(movimentacoes) {
    try {
        const tableBody = document.querySelector('#movimentacoesTable tbody');
        tableBody.innerHTML = ''; // Limpa as linhas existentes

        movimentacoes.forEach(async movimentacao => {
            
            const produtoData = await fetchProdutoData(movimentacao.ProdutoDeApoioID);
            const funcionarioData = await fetchFuncionarioData(movimentacao.FuncionarioID);
            console.log(produtoData);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movimentacao.ID}</td>
                <td>(ID: ${produtoData.ID || 'ID Desconhecido'} ) ${produtoData.Nome || 'Produto Desconhecido'}</td>
                <td>${funcionarioData.Nome || 'Funcionario Desconhecido'}</td>
                <td>${new Date(movimentacao.DataMovimentacao).toLocaleDateString()}</td>
                <td>${movimentacao.Quantidade}</td>
                <td>${movimentacao.TipoMovimentacao}</td>
            `;
            tableBody.appendChild(row);
        });
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
    } else {
        swal("Erro", "ID do beneficiário não encontrado na URL.", "error");
    }
});
