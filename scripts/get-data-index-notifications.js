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
  
      // Add notification date
      const dateSpan = document.createElement('span');
      dateSpan.classList.add('date');
      dateSpan.textContent = new Date(notification.data_acao).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      listItem.appendChild(dateSpan);
  
      // Append the generated item to the list
      notificationList.appendChild(listItem);
    });
  }
  
  // Generate notification items when the page loads
  generateNotificationItems();
  