document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    credentials: 'include', // Inclui cookies na requisição
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Login failed');
    }
  })
  .then(data => {
    console.log('Login response:', data);
    if (data.success) {
      console.log('User is logged in:', data.user);

      // Criar uma notificação após login bem-sucedido
      const notification = {
        id_utilizador: data.user.id,
        tipo_acao: 'Login',
        descricao_acao: `Utilizador ${data.user.nome} fez login na plataforma`,
        status: 'Login'
      };

      fetch('http://localhost:3000/api/notificacoes', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create notification');
        }
        // Redirecionar para outra página após login bem-sucedido e criação da notificação
        window.location.href = './index.html';
      })
      .catch(error => {
        console.error('Error creating notification:', error);
        // Mesmo se falhar a criação da notificação, ainda redirecionar
        window.location.href = './index.html';
      });

    } else {
      console.log('Login failed:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
