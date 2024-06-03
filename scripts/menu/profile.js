// Função para atualizar o nome do perfil no menu
function updateProfileName(profileName, profileImage) {
  const profileBox = document.getElementById('profile-box');
  if (profileBox) {
    profileBox.innerHTML = `
      <a href="#" data-toggle="dropdown" class="dropdown-toggle profilebox">
        <img src="${profileImage}" alt="img">
        <b id="profile-name">${profileName}</b>
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu dropdown-menu-list dropdown-menu-right" id="profile-menu"></ul>
    `;
  }
}

// Função para gerar o menu do perfil
function generateProfileMenu(items) {
  const profileMenu = document.getElementById('profile-menu');
  profileMenu.innerHTML = '';
  items.forEach(item => {
    if (item.divider) {
      const divider = document.createElement('li');
      divider.classList.add('divider');
      profileMenu.appendChild(divider);
    } else {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      if (item.iconClass) {
        const icon = document.createElement('i');
        icon.className = item.iconClass;
        link.appendChild(icon);
      }
      link.innerHTML += item.name;
      listItem.appendChild(link);
      profileMenu.appendChild(listItem);
    }
  });

  // Adicione o item "Sair" ao menu do perfil
  const logoutItem = document.createElement('li');
  const logoutLink = document.createElement('a');
  logoutLink.href = '#'; // Prevent default link action
  logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    fetch('http://localhost:3000/api/login/logout', {
      method: 'POST',
      credentials: 'include' // Include cookies in the request
    })
    .then(response => {
      if (response.ok) {
        window.location.href = './login.html'; // Redirect to login page after logout
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  const logoutIcon = document.createElement('i');
  logoutIcon.className = 'fa falist fa-power-off';
  logoutLink.appendChild(logoutIcon);
  logoutLink.innerHTML += 'Sair';
  logoutItem.appendChild(logoutLink);
  profileMenu.appendChild(logoutItem);
}

// Função para buscar os dados do usuário da sessão
function fetchUserData() {
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
    if (data.user) {
      console.log('User data:', data.user);
      const profileName = data.user.nome;
      const profileImage = data.user.profileImg || 'img/profileimg.png'; // Default image if profileImg is not set
      updateProfileName(profileName, profileImage);
      generateProfileMenu(profileMenuItems);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Redirecionar para a página de login se não estiver autenticado
    window.location.href = './login.html';
  });
}

// Definição dos itens do menu de perfil
const profileMenuItems = [
  { href: '#', iconClass: 'fa falist fa-wrench', name: 'Definições' },
  { divider: true },
  { href: '#', iconClass: 'fa falist fa-lock', name: 'Bloquear' },
];

// Buscar os dados do usuário e atualizar o perfil no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  fetchUserData();
});