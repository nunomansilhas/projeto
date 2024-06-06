document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    if (!productId) {
      window.location.href = 'produtos.html';
      return;
    }
  
    try {
      const productResponse = await fetch(`http://localhost:3000/api/produtos/${productId}`);
      if (!productResponse.ok) throw new Error('Produto não encontrado');
      const product = await productResponse.json();
  
      const tiposProdutosResponse = await fetch('http://localhost:3000/api/tiposprodutos');
      if (!tiposProdutosResponse.ok) throw new Error('Erro ao buscar tipos de produtos');
      const tiposProdutos = await tiposProdutosResponse.json();
  
      const tipoProdutoMap = tiposProdutos.reduce((map, tipo) => {
        map[tipo.ID] = tipo.Nome;
        return map;
      }, {});
  
      const imagesResponse = await fetch(`http://localhost:3000/api/upload/${productId}`);
      if (!imagesResponse.ok) throw new Error('Erro ao buscar imagens do produto');
      const images = await imagesResponse.json();
  
      const movimentacoesResponse = await fetch(`http://localhost:3000/api/movimentacoes`);
      if (!movimentacoesResponse.ok) throw new Error('Erro ao buscar movimentações');
      const movimentacoes = await movimentacoesResponse.json();
  
      const productMovimentacoes = movimentacoes.filter(mov => mov.ProdutoDeApoioID === productId);

      const carouselIndicators = images.map((image, index) => `
        <li data-target="#productCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
      `).join('');
  
      const carouselInner = images.map((image, index) => `
        <div class="item ${index === 0 ? 'active' : ''}">
          <img src="${image.imageUrl}" alt="${product.Nome}">
        </div>
      `).join('');
  
      const movimentacoesTableRows = await Promise.all(productMovimentacoes.map(async (movimentacao) => {
        const produtoData = await fetchProdutoData(movimentacao.ProdutoDeApoioID);
        const funcionarioData = await fetchFuncionarioData(movimentacao.FuncionarioID);
        const clienteData = await fetchClienteData(movimentacao.ClienteID);
  
        return `
          <tr>
            <td>${movimentacao.ID}</td>
            <td>${clienteData.Nome || 'Cliente Desconhecido'}</td>
            <td>${funcionarioData.Nome || 'Funcionário Desconhecido'}</td>
            <td>${new Date(movimentacao.DataMovimentacao).toLocaleDateString()}</td>
            <td><a href="#" type="button" class="btn btn-square btn-light btn-icon"><i class="fa fa-eye"></i></a></td>
          </tr>
        `;
      }));
  
      const movimentacoesTable = productMovimentacoes.length > 0 ? `
        <table class="table table-default">
          <thead>
            <tr>
              <td>ID</td>
              <td>BENEFICIÁRIO</td>
              <td>FUNCIONÁRIO</td>
              <td>Data</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            ${movimentacoesTableRows.join('')}
          </tbody>
        </table>
      ` : '<p>Nenhuma movimentação encontrada para este produto.</p>';
  
      const productDetailsHtml = `
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <div class="panel panel-default">
              <div class="panel-title">
                Galeria de produto : ${product.ID}
                <ul class="panel-tools">
                    <li><a href="#">Nova Imagem</a></li>
                </ul>
              </div>
              <div class="panel-body">
                <div id="productCarousel" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    ${carouselIndicators}
                  </ol>
                  <div class="carousel-inner">
                    ${carouselInner}
                  </div>
                  <a class="left carousel-control" href="#productCarousel" data-slide="prev">
                    <span class="fa fa-arrow-left"></span>
                  </a>
                  <a class="right carousel-control" href="#productCarousel" data-slide="next">
                    <span class="fa fa-arrow-right"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="panel panel-default">
              <div class="panel-title">
                Dados do Produto : ${product.ID}
                <ul class="panel-tools">
                    <li><a style="border: 1px solid blue;" href="#" type="button" class="btn btn-square btn-light ">Editar</a></li>
                    <li><a style="border: 1px solid red;" href="#" type="button" class="btn btn-rounded btn-light ">Eliminar</a></li>
                </ul>
              </div>
              <div class="panel-body">
                <table class="table table-striped">
                  <tr>
                    <th class="text-right">ID</th>
                    <td>${product.ID}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Nome</th>
                    <td>${product.Nome}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Categoria</th>
                    <td>${tipoProdutoMap[product.TipoProdutoID] || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Quantidade</th>
                    <td>${product.quantidade}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Donativo</th>
                    <td>${product.donativo}</td>
                  </tr>
                  <tr>
                    <th class="text-right">Disponibilidade</th>
                    <td><span class="label label-success">${product.Disponibilidade}</span></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="panel panel-default">
              <div class="panel-title">
                Movimentações do Produto : ${product.ID}
                <ul class="panel-tools">
                    <li><a href="#">Ver Mais</a></li>
                </ul>
              </div>
              <div class="panel-body">
                ${movimentacoesTable}
              </div>
            </div>
          </div>
        </div>
      `;
  
      document.querySelector('.container-default').innerHTML = productDetailsHtml;
    } catch (error) {
      alert(`Erro: ${error.message}. Redirecionando de volta...`);
      window.location.href = 'produtos.html';
    }
  });

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


