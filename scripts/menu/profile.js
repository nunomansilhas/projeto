// Definição do nome do perfil
const profileName = 'Jonathan Doe';

// Definição dos itens do menu de perfil
const profileMenuItems = [
  { href: '#', iconClass: 'fa falist fa-wrench', name: 'Definições' },
  { divider: true },
  { href: '#', iconClass: 'fa falist fa-lock', name: 'Bloquear' },
  { href: '#', iconClass: 'fa falist fa-power-off', name: 'Sair' }
];

// Função para atualizar o nome do perfil no menu
function updateProfileName() {
  const profileBox = document.getElementById('profile-box');
  if (profileBox) {
    profileBox.innerHTML = `
      <a href="#" data-toggle="dropdown" class="dropdown-toggle profilebox">
        <img src="img/profileimg.png" alt="img">
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
}

// Gerar o nome do perfil e o menu do perfil no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  updateProfileName();
  generateProfileMenu(profileMenuItems);
});
