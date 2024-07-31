document.getElementById('forgotPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            Swal.fire({
                title: 'Sucesso',
                text: 'Caso este email exista, você receberá uma nova senha no seu email.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            throw new Error('Erro ao tentar redefinir a senha');
        }
    } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao tentar redefinir a senha. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
