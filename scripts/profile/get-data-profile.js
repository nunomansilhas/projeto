// Função para buscar os dados do perfil do funcionário logado
async function fetchProfileData() {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    const data = await response.json();
    if (data.user) {
      document.getElementById('funcionario-nome').textContent = data.user.nome;
      document.getElementById('funcionario-username').textContent = data.user.username;
      document.getElementById('funcionario-cargo').textContent = data.user.cargo;
      document.getElementById('funcionario-email').textContent = data.user.email;
      document.getElementById('funcionario-imagem').src = data.user.profileImg || 'img/profileimg.png';

      // Adiciona os IDs necessários para edição
      document.getElementById('edit-password-btn').dataset.funcionarioId = data.user.id;
      document.getElementById('edit-password-btn').dataset.funcionarioName = data.user.nome;
      document.getElementById('edit-funcionario-btn').dataset.funcionarioId = data.user.id;
      document.getElementById('edit-funcionario-btn').dataset.funcionarioName = data.user.nome;
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do perfil:', error);
    swal("Erro", "Ocorreu um erro ao carregar os dados do perfil.", "error");
  }
}

// Carregar os dados do perfil ao carregar a página
document.addEventListener('DOMContentLoaded', fetchProfileData);
