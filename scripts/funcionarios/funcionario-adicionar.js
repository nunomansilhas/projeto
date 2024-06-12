import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addFuncionarioForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/api/funcionarios', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar funcionário');
            }

            const result = await response.json();
            console.log('Funcionário adicionado:', result);
            swal("Sucesso", "Funcionário adicionado com sucesso!", "success");

            // Enviar notificação
            await enviarNotificacao('Adicionado', `Adicionou o Funcionário ${result.nome} com ID:(${result.id})`);

            // Redirecionar para a página de funcionários
            window.location.href = 'funcionarios.html';
        } catch (error) {
            console.error('Erro:', error);
            swal("Erro", "Ocorreu um erro ao adicionar o funcionário.", "error");
        }
    });
});
