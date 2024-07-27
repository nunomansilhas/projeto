// Função para buscar os dados da empresa
async function fetchEmpressaData() {
    try {
      const response = await fetch('http://localhost:3000/api/dadosEmpresa');
  
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da empresa');
      }
  
      const data = await response.json();
      if (data) {
        document.getElementById('empresa-contribuinte').textContent = data.contribuinte;
        document.getElementById('empresa-endereco').textContent = data.endereco;
        document.getElementById('empresa-cidade').textContent = data.cidade;
        document.getElementById('empresa-telefone').textContent = data.telefone;
        document.getElementById('empresa-email').textContent = data.email;
      }
    } catch (error) {
      console.error('Erro ao carregar os dados da empresa:', error);
      swal("Erro", "Ocorreu um erro ao carregar os dados da empresa.", "error");
    }
  }
  
  // Carregar os dados da empresa ao carregar a página
  document.addEventListener('DOMContentLoaded', fetchEmpressaData);
  