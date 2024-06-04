async function fetchFuncionarioData(id) {
  const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`);
  const data = await response.json();
  return data;
}

async function fetchNotifications() {
  const response = await fetch('http://localhost:3000/api/notificacoes');
  const notifications = await response.json();
  return notifications;
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
      return `há ${interval} anos`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return `há ${interval} meses`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return `há ${interval} dias`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return `há ${interval} horas`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return `há ${interval} minutos`;
  }
  return `há ${Math.floor(seconds)} segundos`;
}

async function generateNotificationItems() {
  const notificationList = document.getElementById('notification-list');
  const notifications = await fetchNotifications();

  // Limit the number of notifications to 7
  const limitedNotifications = notifications.slice(0, 7);

  limitedNotifications.forEach(async notification => {
      const listItem = document.createElement('li');
      listItem.classList.add('clearfix');

      // Fetch funcionario data
      const funcionarioData = await fetchFuncionarioData(notification.id_utilizador);

      // Create the notification item based on the provided design
      const statusClass = getStatusClass(notification.status);

      listItem.innerHTML = `
          <span class="right">${timeSince(notification.data_acao)}</span>
          <img src="${funcionarioData.profileImg || 'img/profileimg.png'}" alt="img" class="img">
          <b>${funcionarioData.Nome || 'Unknown'}</b>
          <span class="desc"><a class="label ${statusClass}">${notification.status}</a> ${notification.descricao_acao}</span>
      `;

      // Append the generated item to the list
      notificationList.appendChild(listItem);
  });
}

function getStatusClass(status) {
  switch (status) {
      case 'Adicionado':
          return 'label-success';
      case 'Editado':
          return 'label-primary';
      case 'Entrou':
          return 'label-warning';
      case 'Novo Produto':
          return 'label-info';
      case 'Relatório Criado':
          return 'label-primary';
      case 'Eliminado':
          return 'label-danger';
      default:
          return 'label-default';
  }
}

// Generate notification items when the page loads
document.addEventListener('DOMContentLoaded', () => {
  generateNotificationItems();
});
