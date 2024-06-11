document.addEventListener('DOMContentLoaded', () => {
    const beneficiarioForm = document.querySelector('#beneficiarioForm');
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
    async function enviarNotificacao(nomeBeneficiario) {
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
                    descricao_acao: `Funcionario ${data.user.nome} Adicionou um novo Beneficiário (${nomeBeneficiario})`,
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

    // Função para enviar beneficiário
    async function enviarBeneficiario(payload) {
        const response = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            body: payload,
        });

        if (!response.ok) {
            const responseBody = await response.json();
            throw new Error(`Failed to create beneficiary: ${response.statusText} ${responseBody}`);
        }

        const beneficiaryData = await response.json();
        console.log('Beneficiário criado com sucesso', beneficiaryData);
        return beneficiaryData.id;
    }

    beneficiarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(beneficiarioForm);
        const nome = formData.get('nome');
        const morada = formData.get('morada');
        const email = formData.get('email');
        const telemovel = formData.get('telemovel');
        const imgFile = fileInput.files[0]; // Obtenha o arquivo de imagem

        try {
            const payload = new FormData();
            payload.append('nome', nome);
            payload.append('morada', morada);
            payload.append('email', email);
            payload.append('telemovel', telemovel);
            if (imgFile) {
                payload.append('image_profile', imgFile);
            }

            await enviarBeneficiario(payload);

            await enviarNotificacao(nome);
            beneficiarioForm.reset();
            showAlert('Beneficiário criado com sucesso!'); // Mostra o alerta de sucesso
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
