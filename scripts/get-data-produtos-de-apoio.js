async function fetchTiposProdutos() {
    const response = await fetch('http://localhost:3000/api/tiposprodutos');
    return response.json();
  }
  
  async function fetchProdutos() {
    const response = await fetch('http://localhost:3000/api/produtos');
    return response.json();
  }
  
  async function populateDataTable() {
    const tiposProdutos = await fetchTiposProdutos();
    const produtos = await fetchProdutos();
  
    // Map TipoProdutoID to TipoProduto Nome
    const tipoProdutoMap = tiposProdutos.reduce((map, tipo) => {
      map[tipo.ID] = tipo.Nome;
      return map;
    }, {});
  
    // Populate DataTable
    const tableBody = document.querySelector('#produtosTable tbody');
    produtos.forEach(produto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${produto.ID}</td>
        <td>${produto.Nome}</td>
        <td>${produto.Descricao}</td>
        <td>${tipoProdutoMap[produto.TipoProdutoID] || 'N/A'}</td>
        <td>${produto.Disponibilidade}</td>
      `;
      tableBody.appendChild(row);
    });
  
    // Initialize DataTable
    $('#produtosTable').DataTable();
  }
  
  // Populate the DataTable when the document is ready
  document.addEventListener('DOMContentLoaded', populateDataTable);
  