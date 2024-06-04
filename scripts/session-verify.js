fetch('http://localhost:3000/api/login', {
    credentials: 'include' // Necessário para enviar cookies de sessão
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    return response.json();
  })
  .then(data => {
    console.log('User data:', data.user);
  })
  .catch(error => {
    console.error('Error:', error);
    // Redirecionar para a página de login se não estiver autenticado
    //window.location.href = './login.html';
  });