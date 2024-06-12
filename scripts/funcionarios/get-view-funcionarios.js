import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação
import { showEditFuncionarioModal } from './funcionarios-editar.js'; // Importar a função de edição
import { confirmDelete, deleteFuncionario } from './funcionario-eliminar.js'; // Importar a função de exclusão

async function fetchFuncionario(id) {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados do funcionário');
    }
    return response.json();
}

async function populateFuncionarioData(id) {
    try {
        const funcionario = await fetchFuncionario(id);
        document.getElementById('funcionario-nome').textContent = funcionario.Nome;
        document.getElementById('funcionario-email').textContent = funcionario.Email;
        document.getElementById('funcionario-cargo').textContent = funcionario.Cargo;
        document.getElementById('funcionario-username').textContent = funcionario.username;
        document.getElementById('funcionario-imagem').src = funcionario.profileImg || "img/perfil/default.png";
        document.querySelector('.edit-funcionario').dataset.funcionarioId = funcionario.ID;
        document.querySelector('.edit-funcionario').dataset.funcionarioName = funcionario.Nome;
        document.querySelector('.delete-funcionario').dataset.funcionarioId = funcionario.ID;
        document.querySelector('.delete-funcionario').dataset.funcionarioName = funcionario.Nome;
    } catch (error) {
        console.error('Erro ao popular os dados do funcionário:', error);
        swal("Erro", "Ocorreu um erro ao carregar os dados do funcionário.", "error");
    }
}

// Função para lidar com a exclusão
async function handleDelete(event) {
    event.preventDefault();
    const funcionarioId = event.currentTarget.dataset.funcionarioId;
    const funcionarioNome = event.currentTarget.dataset.funcionarioName;
    const confirmed = await confirmDelete();
    if (confirmed) {
        await deleteFuncionario(funcionarioId, funcionarioNome);
        window.location.href = 'funcionarios.html';
    }
}

// Get funcionario ID from URL
function getFuncionarioIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Populate data when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
    const funcionarioId = getFuncionarioIdFromUrl();
    if (funcionarioId) {
        await populateFuncionarioData(funcionarioId);
        
        // Adicionar eventos de clique para editar e excluir
        document.querySelector('.edit-funcionario').addEventListener('click', async () => {
            const funcionario = await fetchFuncionario(funcionarioId);
            showEditFuncionarioModal(funcionario);
        });
        document.querySelector('.delete-funcionario').addEventListener('click', handleDelete);
    } else {
        swal("Erro", "ID do funcionário não encontrado na URL.", "error");
    }
});
