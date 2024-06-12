// Função para buscar todos os funcionários
async function fetchFuncionarios() {
    const response = await fetch('http://localhost:3000/api/funcionarios');
    if (!response.ok) {
        throw new Error('Erro ao buscar os funcionários');
    }
    return response.json();
}

// Função para popular a tabela de funcionários
async function populateFuncionariosTable() {
    try {
        const funcionarios = await fetchFuncionarios();
        const tableBody = document.querySelector('#funcionariosTable tbody');
        tableBody.innerHTML = '';

        funcionarios.forEach(funcionario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${funcionario.ID}</td>
                <td>${funcionario.Nome}</td>
                <td>${funcionario.Cargo}</td>
                <td>${funcionario.Email}</td>
                <td>
                    <a href="funcionarios-visualizar.html?id=${funcionario.ID}" class="btn btn-square btn-view" data-funcionario-id="${funcionario.ID}">Ver Mais</a>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Initialize DataTable
        $('#funcionariosTable').DataTable();
    } catch (error) {
        console.error('Erro ao popular a tabela de funcionários:', error);
        swal("Erro", "Ocorreu um erro ao carregar os funcionários.", "error");
    }
}

// Popular a tabela quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
    await populateFuncionariosTable();
});
