// Função para enviar notificação
async function enviarNotificacao(tipoAcao, descricaoAcao) {
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
          tipo_acao: tipoAcao,
          descricao_acao: descricaoAcao,
          status: tipoAcao
        };
  
        const responseNotificacao = await fetch('http://localhost:3000/api/notificacoes', {
          method: 'POST',
          body: JSON.stringify(notificacaoPayload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!responseNotificacao.ok) {
          throw new Error('Failed to create notification');
        }
  
        console.log('Notificação criada com sucesso');
      }
    } catch (error) {
      console.error('Error:', error);
      window.location.href = './login.html';
    }
  }
  
  export { enviarNotificacao };
  