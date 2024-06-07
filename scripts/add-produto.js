document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.querySelector('#produtoForm');
    const fileInput = document.querySelector('#fileInput');
    const alertContainer = document.getElementById('alertContainer');

    // Função para mostrar alerta
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('kode-alert');
        alertDiv.innerHTML = `<h4>${message}</h4>`;
        alertContainer.appendChild(alertDiv);
        $(alertDiv).fadeIn();

        // Remove o alerta após 3 segundos
        setTimeout(() => {
            $(alertDiv).fadeOut(() => {
                alertDiv.remove();
            });
        }, 3000);
    }

    // Função para enviar notificação
    async function enviarNotificacao(nomeProduto) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                credentials: 'include' // Necessário para enviar cookies de sessão
            });

            if (!response.ok) {
                throw new Error('Not authenticated');
            }

            const data = await response.json();
            if (data.user) {
                const notificacaoPayload = {
                    id_utilizador: data.user.id,
                    tipo_acao: 'Adicionado',
                    descricao_acao: `Funcionario ${data.user.nome} Adicionou um novo Produto de Apoio (${nomeProduto})`,
                    status: 'Adicionado'
                };

                const response_not = await fetch('http://localhost:3000/api/notificacoes', {
                    method: 'POST',
                    body: JSON.stringify(notificacaoPayload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response_not.ok) {
                    throw new Error('Failed to create notification');
                }

                console.log('Notificação criada com sucesso');
            }
        } catch (error) {
            console.error('Error:', error);
            window.location.href = './login.html';
        }
    }

    // Função para enviar produto
    async function enviarProduto(payload) {
        const response = await fetch('http://localhost:3000/api/produtos', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const responseBody = await response.json();
            throw new Error(`Failed to create product: ${response.statusText} ${responseBody}`);
        }

        const productData = await response.json();
        console.log('Produto criado com sucesso', productData);
        return productData.id;
    }

    async function fazerUploadImagens(imgFiles, idProduto) {
        const uploadPromises = Array.from(imgFiles).map(async (imgFile) => {
            const imageFormData = new FormData();
            const randomName = generateRandomName();
            const fileExtension = imgFile.name.split('.').pop(); // Get the file extension
            const imageName = `${randomName}.${fileExtension}`; // Construct the new image name
            imageFormData.append('img', imgFile, imageName); // Append the file with the new name
            imageFormData.append('idProduto', idProduto); // Adiciona idProduto ao FormData
            imageFormData.append('customPath', 'img/produtos/'); // Always use 'img/produtos/' path
        
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
    
        return Promise.all(uploadPromises);
    }
    
       
    // Function to generate a random 15-character string
    function generateRandomName() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomName = '';
        for (let i = 0; i < 15; i++) {
            randomName += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomName;
    }
    

    

    produtoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(produtoForm);
        const idProduto = formData.get('idproduto');
        const nome = formData.get('nomeproduto');
        const descricao = formData.get('descricao');
        const tipoProdutoId = formData.get('tipoproduto');
        const disponibilidade = formData.get('disponibilidade');
        const quantidade = formData.get('quantidade');
        const donativo = formData.get('donativo');
        const imgFiles = fileInput.files; // Obtenha todos os arquivos

        try {
            const payload = { idProduto, nome, descricao, tipoProdutoId, disponibilidade, quantidade, donativo };
            const produtoId = await enviarProduto(payload);

            if (imgFiles.length > 0) {
                await fazerUploadImagens(imgFiles, produtoId);
            }

            await enviarNotificacao(nome);
            produtoForm.reset();
            showAlert('Produto criado com sucesso!'); // Mostra o alerta de sucesso
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
