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
      const spanClass = produto.Disponibilidade === 'Sim' ? 'label label-success' : 'label label-danger'; // Dynamically set class
      row.innerHTML = `
        <td>${produto.ID}</td>
        <td>${produto.Nome}</td>
        <td>${produto.Descricao}</td>
        <td>${tipoProdutoMap[produto.TipoProdutoID] || 'N/A'}</td>
        <td><span class="${spanClass}">${produto.Disponibilidade}</span></td> <!-- Set class dynamically -->
        <td>${produto.quantidade}</td>
        <td class="text-right"><span class="label label-default">${produto.donativo}</span></td>
        <td class="text-right">
          <a href="#" type="button" class="btn btn-rounded btn-info btn-icon"><i class="fa fa-eye"></i></a>
          <a href="#" type="button" class="btn btn-rounded btn-primary btn-icon"><i class="fa fa-edit"></i></a>
          <a href="#" type="button" class="btn btn-rounded btn-danger btn-icon"><i class="fa fa-trash"></i></a>
        </td>
      `;
      tableBody.appendChild(row);
    });

  
    // Initialize DataTable
    $('#produtosTable').DataTable();
  }
  
  // Populate the DataTable when the document is ready
  document.addEventListener('DOMContentLoaded', populateDataTable);
  