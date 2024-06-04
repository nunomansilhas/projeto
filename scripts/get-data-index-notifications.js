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
      listItem.classList.add('item', 'clearfix');

      // Fetch funcionario data
      const funcionarioData = await fetchFuncionarioData(notification.id_utilizador);
      console.log(funcionarioData);

      // Add profile image
      const profileImg = document.createElement('img');
      profileImg.src = funcionarioData.profileImg || 'img/profileimg.png';
      profileImg.alt = 'Profile Image';
      profileImg.classList.add('img');
      listItem.appendChild(profileImg);

      // Add notification status
      const statusSpan = document.createElement('span');
      statusSpan.classList.add('right', 'label');
      statusSpan.textContent = notification.status || 'Status not available';

      // Add different classes based on the type of status
      switch (notification.status) {
          case 'Adicionado':
              statusSpan.classList.add('label', 'label-success');
              break;
          case 'Editado':
              statusSpan.classList.add('label', 'label-primary');
              break;
          case 'Entrou':
              statusSpan.classList.add('label', 'label-warning');
              break;
          case 'Novo Produto':
              statusSpan.classList.add('label', 'label-info');
              break;
          case 'Relatório Criado':
              statusSpan.classList.add('label', 'label-primary');
              break;
          case 'Eliminado':
              statusSpan.classList.add('label', 'label-danger');
              break;
          default:
              statusSpan.classList.add('label', 'label-default');
      }

      listItem.appendChild(statusSpan);

      // Add funcionario name
      const fromSpan = document.createElement('span');
      fromSpan.classList.add('from');
      fromSpan.textContent = funcionarioData.Nome || 'Unknown';
      listItem.appendChild(fromSpan);

      // Add notification description
      const descriptionSpan = document.createElement('span');
      descriptionSpan.textContent = notification.descricao_acao;
      listItem.appendChild(descriptionSpan);

      // Add notification time since
      const dateSpan = document.createElement('span');
      dateSpan.classList.add('date');
      dateSpan.textContent = timeSince(notification.data_acao);
      listItem.appendChild(dateSpan);

      // Append the generated item to the list
      notificationList.appendChild(listItem);
  });
}

// Generate notification items when the page loads
document.addEventListener('DOMContentLoaded', () => {
  generateNotificationItems();
});
