document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.querySelector('#produtoForm');
    const fileInput = document.querySelector('#fileInput'); // Novo input de arquivo

    // Function to handle form submission
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
        const imgFile = fileInput.files[0]; // Recuperar o arquivo de imagem do input

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

        let img = ""; // Default image path
        if (imgFile) {
            const imageFormData = new FormData();
            imageFormData.append('img', imgFile); // Altere 'imageUrl' para 'img'

            try {
                console.log('Uploading image...');
                const uploadResponse = await fetch('http://localhost:3000/api/upload', {
                    method: 'POST',
                    body: imageFormData
                });

                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    img = uploadData.path;
                    console.log('Image uploaded successfully:', img);

                    const url = 'http://localhost:3000/api/produtos';

                    const payload = { idProduto, nome, descricao, tipoProdutoId, disponibilidade, quantidade, donativo };
                    console.log('Payload:', payload);

                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        console.log('Product created successfully');
                        produtoForm.reset();
                    } else {
                        const responseBody = await response.json();
                        console.error('Failed to create product:', response.statusText, responseBody);
                    }
                } else {
                    console.error('Failed to upload image:', uploadResponse.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.log('No image file provided.');
            try {
                const url = 'http://localhost:3000/api/produtos';

                const payload = { idProduto, nome, descricao, tipoProdutoId, disponibilidade, quantidade, donativo };
                console.log('Payload:', payload);

                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log('Product created successfully without image');
                    produtoForm.reset();
                } else {
                    const responseBody = await response.json();
                    console.error('Failed to create product:', response.statusText, responseBody);
                }
            } catch (error) {
                console.error('Error creating product without image:', error);
            }
        }
    });
});
