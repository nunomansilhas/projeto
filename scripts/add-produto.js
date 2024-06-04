document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.querySelector('#produtoForm');
    const fileInput = document.querySelector('#fileInput');

    // Função para enviar notificação
    async function enviarNotificacao(nomeProduto) {
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

    // Função para fazer upload de imagem
    async function fazerUploadImagem(imgFile, idProduto) {
        const imageFormData = new FormData();
        imageFormData.append('img', imgFile);
        imageFormData.append('idProduto', idProduto); // Adiciona idProduto ao FormData

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
    }

    produtoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(produtoForm);
        const idProduto = formData.get('idproduto');
        const nome = formData.get('nomeproduto'); // Certifique-se de obter corretamente o nome do produto
        const descricao = formData.get('descricao');
        const tipoProdutoId = formData.get('tipoproduto');
        const disponibilidade = formData.get('disponibilidade');
        const quantidade = formData.get('quantidade');
        const donativo = formData.get('donativo');
        const imgFile = fileInput.files[0];
        const userId = 1; // ID do utilizador em sessão
    
        console.log('Form Data:', {
            idProduto,
            nome,
            descricao,
            tipoProdutoId,
            disponibilidade,
            quantidade,
            donativo,
            imgFile
        });
    
        try {
            const payload = { idProduto, nome, descricao, tipoProdutoId, disponibilidade, quantidade, donativo };
            const produtoId = await enviarProduto(payload);
    
            if (imgFile) {
                await fazerUploadImagem(imgFile, produtoId);
            }
    
            await enviarNotificacao(nome); // Garanta que o nome do produto seja passado corretamente aqui
    
            produtoForm.reset();
        } catch (error) {
            console.error('Error:', error);
        }
    });    
});
