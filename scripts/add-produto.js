// add-produto.js

document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.querySelector('form');
    const toastElement = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastElement); // Initialize the toast

    // Function to handle form submission
    produtoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(produtoForm);
        const idProduto = formData.get('idproduto');
        const nomeProduto = formData.get('nomeproduto');
        const descricao = formData.get('descricao');
        const tipoProduto = formData.get('tipoproduto');
        const disponibilidade = formData.get('disponibilidade');
        const quantidade = formData.get('quantidade');
        // Get the uploaded image file
        const imgFile = document.getElementById('dropArea').files[0];

        // Check if imgFile exists and is not empty
        let img = ""; // Default image path
        if (imgFile) {
            const imageFormData = new FormData();
            imageFormData.append('imageUrl', imgFile);

            try {
                const uploadResponse = await fetch('http://localhost:3000/api/upload', {
                    method: 'POST',
                    body: imageFormData
                });

                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    img = uploadData.path; // Use the path where the image is saved

                    const url = 'http://localhost:3000/api/produtos'; // Update this URL

                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({ idProduto, nomeProduto, descricao, tipoProduto, disponibilidade, quantidade, img }),
                        headers: {
                            'Content-Type': 'application/json'
                            // Add any other headers if required
                        }
                    });

                    if (response.ok) {
                        // Handle successful post creation, such as redirecting to another page or displaying a success message
                        const toastTitle = document.querySelector('.toast-title');
                        const toastBody = document.querySelector('.toast-body');
                        toastTitle.textContent = 'Success!';
                        toastBody.textContent = 'Produto adicionado com sucesso.';

                        // Show the toast notification on success
                        toast.show();

                        // Reset the form after successful submission
                        produtoForm.reset();
                    } else {
                        console.error('Failed to create product:', response.statusText);
                        // Handle error responses here
                    }
                } else {
                    console.error('Failed to upload image:', uploadResponse.statusText);
                    // Handle error responses here
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle network errors or other exceptions here
            }
        }
    });
});
