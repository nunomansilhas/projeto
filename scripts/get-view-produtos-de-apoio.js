// Importar as funções de exclusão, edição e envio de notificações
import { deleteProduct, confirmDelete } from './acoes/produto-eliminar.js';
import { showEditModal } from './acoes/produtos-editar.js';
import { createUploadModal, uploadImages } from './acoes/produto-adicionar-imagens.js';
import { createEditImagesModal, deleteSelectedImages } from './acoes/produto-editar-imagens.js';

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

    const productMovimentacoes = movimentacoes.filter(mov => mov.ProdutoDeApoioID == productId);

    const carouselIndicators = images.map((image, index) => `
      <li data-target="#productCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
    `).join('');

    const carouselInner = images.map((image, index) => `
      <div class="item ${index === 0 ? 'active' : ''}">
        <img src="${image.imageUrl}" alt="${product.Nome}">
      </div>
    `).join('');

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

    async function fetchClienteData(clienteId) {
      const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do cliente');
      return response.json();
    }

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
                <li><a href="#" id="addImagesButton">Adicionar Imagens</a></li> <!-- Botão para abrir o modal -->
                <li><a href="#" id="editImagesButton">Editar Imagens</a></li> <!-- Botão para abrir o modal de edição -->
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
                <li><a href="#" type="button" class="edit-product" data-product-id="${product.ID}" data-product-name="${product.Nome}">Editar</a></li>
                <li><a href="#" type="button" class="delete-product" data-product-id="${product.ID}" data-product-name="${product.Nome}">Eliminar</a></li>
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
                <th class="text-right">Descrição</th>
                <td>${product.Descricao.length > 15 ? product.Descricao.substring(0, 15) + '...' : product.Descricao}</td>
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
                <td>
                  ${product.Disponibilidade === "Sim" ? 
                    '<span class="label label-success">Disponível</span>' : 
                    '<span class="label label-danger">Indisponível</span>'}
                </td>
              </tr>
            </table>
          </div>
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

    // Insere os detalhes do produto na página
    document.querySelector('.container-default').innerHTML = productDetailsHtml;

    // Adicionar evento de clique para o botão de edição
    const editButton = document.querySelector('.edit-product');
    editButton.addEventListener('click', () => {
      showEditModal(product, tiposProdutos);
    });

    // Adicionar evento de clique para o botão de exclusão
    const deleteButton = document.querySelector('.delete-product');
    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const confirmed = await confirmDelete();
      if (confirmed) {
        await deleteProduct(product.ID, product.Nome);
        window.location.href = 'produtos.html'; // Redirecionar após exclusão
      }
    });

    // Adicionar evento de clique para o botão de adicionar imagens
    const addImagesButton = document.getElementById('addImagesButton');
    addImagesButton.addEventListener('click', function() {
      if (!document.getElementById('uploadModal')) {
        createUploadModal();
        document.getElementById('uploadImages').addEventListener('click', uploadImages);
      }
      $('#uploadModal').modal('show');
    });

    // Adicionar evento de clique para o botão de editar imagens
    const editImagesButton = document.getElementById('editImagesButton');
    editImagesButton.addEventListener('click', function() {
      if (!document.getElementById('editImagesModal')) {
        createEditImagesModal(images, productId);
      }
      $('#editImagesModal').modal('show');
    });

  } catch (error) {
    alert(`Erro: ${error.message}. Redirecionando de volta...`);
    window.location.href = 'produtos.html';
  }
});

