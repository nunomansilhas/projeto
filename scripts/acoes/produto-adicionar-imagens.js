import { enviarNotificacao } from './enviar-notificacao.js'; // Importar a função de enviar notificação

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

export function createUploadModal() {
  const modalHtml = `
    <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="uploadModalLabel">Adicionar Imagens</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Imagens do Produto:</label>
              <input type="file" id="fileInput" name="img[]" class="form-control" multiple>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" id="uploadImages">Enviar Imagens</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Função para gerar um nome aleatório
function generateRandomName() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomName = '';
  for (let i = 0; i < 15; i++) {
    randomName += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomName;
}

// Função para fazer o upload das imagens
async function fazerUploadImagens(imgFiles, idProduto) {
  const uploadPromises = Array.from(imgFiles).map(async (imgFile) => {
    const imageFormData = new FormData();
    const randomName = generateRandomName();
    const fileExtension = imgFile.name.split('.').pop(); // Obtenha a extensão do arquivo
    const imageName = `${randomName}.${fileExtension}`; // Construa o novo nome da imagem
    imageFormData.append('img', imgFile, imageName); // Adicione o arquivo com o novo nome ao FormData
    imageFormData.append('idProduto', idProduto); // Adicione idProduto ao FormData
    imageFormData.append('customPath', 'img/produtos/'); // Sempre use 'img/produtos/' path

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: imageFormData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const uploadData = await response.json();
    console.log('Imagem enviada com sucesso:', uploadData.path);

    return uploadData.path;
  });

  // Aguardar até que todas as promessas sejam resolvidas
  const uploadedPaths = await Promise.all(uploadPromises);

  // Ajustar o texto de "Imagem/Imagens" conforme a quantidade
  const quantidade = uploadedPaths.length;
  const textoImagem = quantidade === 1 ? 'Imagem' : 'Imagens';

  // Enviar uma notificação única após todas as imagens serem enviadas
  await enviarNotificacao('Adicionado', `Adicionou ${quantidade} ${textoImagem} ao Produto de Apoio com ID:(${idProduto})`);

  return uploadedPaths;
}

// Função para enviar as imagens
export function uploadImages() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  if (!files.length) {
    alert('Nenhuma imagem selecionada.');
    return;
  }

  // Usar a função fazerUploadImagens para enviar as imagens
  fazerUploadImagens(files, productId)
    .then((paths) => {
      location.reload(); // Recarrega a página para atualizar a galeria de imagens
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Falha ao enviar imagens.');
    });
}
