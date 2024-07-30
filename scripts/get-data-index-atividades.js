async function fetchMovimentacoes() {
  const response = await fetch('http://localhost:3000/api/movimentacoes');
  const movimentacoes = await response.json();
  return movimentacoes;
}

async function fetchFuncionarioData(id) {
  const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`);
  const data = await response.json();
  return data;
}

async function fetchClienteData(id) {
  const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
  const data = await response.json();
  return data;
}

async function fetchProdutoData(id) {
  const response = await fetch(`http://localhost:3000/api/produtos/${id}`);
  const data = await response.json();
  return data;
}

async function generateInventorySummary() {
  const summaryList = document.getElementById('inventory-summary');
  const movimentacoes = await fetchMovimentacoes();

  // Filter only 'Saída' type and sort by DataMovimentacao in ascending order
  const filteredMovimentacoes = movimentacoes
    .filter(mov => mov.TipoMovimentacao === 'Saída')
    .sort((a, b) => new Date(a.DataMovimentacao) - new Date(b.DataMovimentacao))
    .slice(0, 10);  // Limit to the first 10 items

  for (const movimentacao of filteredMovimentacoes) {
    const listItem = document.createElement('tr');

    // Fetch related data
    const produtoData = await fetchProdutoData(movimentacao.ProdutoDeApoioID);
    const funcionarioData = await fetchFuncionarioData(movimentacao.FuncionarioID);
    const clienteData = await fetchClienteData(movimentacao.ClienteID);

    // Create table cells
    const produtoCell = document.createElement('td');
    produtoCell.textContent = '( '+ produtoData.ID +' ) '+ produtoData.Nome || 'Produto Desconhecido';
    listItem.appendChild(produtoCell);

    const clienteCell = document.createElement('td');
    clienteCell.textContent = clienteData.nome || 'Cliente Desconhecido';
    listItem.appendChild(clienteCell);

    const funcionarioCell = document.createElement('td');
    funcionarioCell.textContent = funcionarioData.Nome || 'Funcionário Desconhecido';
    listItem.appendChild(funcionarioCell);

    const dataDevolucao = new Date(movimentacao.DataMovimentacao);
    const hoje = new Date();
    const diffDias = Math.floor((dataDevolucao - hoje) / (1000 * 60 * 60 * 24));
    const devolucaoCell = document.createElement('td');
    devolucaoCell.classList.add('text-r');
    const devolucaoLabel = document.createElement('span');
    devolucaoLabel.classList.add('label', diffDias < 0 ? 'label-danger' : 'label-success');
    devolucaoLabel.textContent = `${diffDias < 0 ? '-' : '+'}${Math.abs(diffDias)} dias`;
    devolucaoCell.appendChild(devolucaoLabel);
    listItem.appendChild(devolucaoCell);

    // Add View More button
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('text-r');
    const viewButton = document.createElement('a');
    viewButton.href = `solicitacoes.html?movimentacaoID=${movimentacao.ID}`; // Adjusted URL
    viewButton.classList.add('btn', 'btn-light', 'btn-icon');
    viewButton.innerHTML = '<i class="fa fa-eye"></i>';
    actionsCell.appendChild(viewButton);
    listItem.appendChild(actionsCell);

    // Append the generated item to the list
    summaryList.appendChild(listItem);
  }
}

// Generate inventory summary items when the page loads
document.addEventListener('DOMContentLoaded', generateInventorySummary);
