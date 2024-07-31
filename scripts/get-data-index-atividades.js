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
    const produtoLink = document.createElement('a');
    produtoLink.href = `produtos-visualizar.html?id=${produtoData.ID}`;
    produtoLink.textContent = `( ${produtoData.ID} ) ${produtoData.Nome || 'Produto Desconhecido'}`;
    produtoLink.classList.add('table-link');
    produtoCell.appendChild(produtoLink);
    listItem.appendChild(produtoCell);

    const clienteCell = document.createElement('td');
    const clienteLink = document.createElement('a');
    clienteLink.href = `beneficiarios-visualizar.html?id=${clienteData.id}`;
    clienteLink.textContent = clienteData.nome || 'Cliente Desconhecido';
    clienteLink.classList.add('table-link');
    clienteCell.appendChild(clienteLink);
    listItem.appendChild(clienteCell);

    const funcionarioCell = document.createElement('td');
    const funcionarioLink = document.createElement('a');
    funcionarioLink.href = `funcionarios-visualizar.html?id=${funcionarioData.ID}`;
    funcionarioLink.textContent = funcionarioData.Nome || 'Funcionário Desconhecido';
    funcionarioLink.classList.add('table-link');
    funcionarioCell.appendChild(funcionarioLink);
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

    // Add new "Ver Mais" button
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('text-r');
    const viewButton = document.createElement('a');
    viewButton.href = `solicitacoes.html?movimentacaoID=${movimentacao.ID}`; // Adjusted URL
    viewButton.classList.add('btn', 'btn-square', 'btn-view');
    viewButton.textContent = 'Ver Mais';
    actionsCell.appendChild(viewButton);
    listItem.appendChild(actionsCell);

    // Append the generated item to the list
    summaryList.appendChild(listItem);
  }

  // Check if more than 7 items and adjust height if needed
  if (summaryList.children.length > 7) {
    document.querySelector('.panel-body.table-responsive').style.maxHeight = '500px';
    document.querySelector('.panel-body.table-responsive').style.overflowY = 'auto';
  } else {
    document.querySelector('.panel-body.table-responsive').style.maxHeight = 'none';
    document.querySelector('.panel-body.table-responsive').style.overflowY = 'visible';
  }
}

// Generate inventory summary items when the page loads
document.addEventListener('DOMContentLoaded', generateInventorySummary);
