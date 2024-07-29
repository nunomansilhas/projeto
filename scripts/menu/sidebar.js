async function fetchSessionUser() {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        credentials: 'include' // Necessário para enviar cookies de sessão
      });
  
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
  
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Erro:', error);
      // Redirecionar para a página de login se não estiver autenticado
      window.location.href = './login.html';
    }
  }
  
  // Gera a sidebar ao carregar a página
  document.addEventListener('DOMContentLoaded', async () => {
    const sessionUser = await fetchSessionUser();
    if (sessionUser) {
      generateSidebar(sidebarItems, sessionUser);
    }
  });

const sidebarItems = [
  {
      title: 'PRINCIPAL',
      items: [
          { href: 'index.html', iconClass: 'fa fa-home', name: 'Painel de Controlo', colorClass: 'color1' },
          { href: 'produtos.html', iconClass: 'fa fa-archive', name: 'Produtos', colorClass: 'color2' },
          { href: 'solicitacoes.html', iconClass: 'fa fa-clipboard', name: 'Solicitações', colorClass: 'color3' },
          { href: 'doacoes.html', iconClass: 'fa fa-gift', name: 'Doações', colorClass: 'color4' },
          { href: 'beneficiarios.html', iconClass: 'fa fa-users', name: 'Beneficiários', colorClass: 'color5' }
      ]
  },
  {
      title: 'ADMIN',
      items: [
            { href: 'funcionarios.html', iconClass: 'fa fa-male', name: 'Funcionários', colorClass: 'color6' },
            { href: 'categorias.html', iconClass: 'fa fa-cog', name: 'Categorias', colorClass: 'color7' },
            { href: 'notificacoes.html', iconClass: 'fa fa-bell-o', name: 'Notificações', colorClass: 'color9' },
            { href: 'empressa.html', iconClass: 'fa fa-briefcase', name: 'Dados de Empressa', colorClass: 'color10' }
      ]
  }
];

function generateSidebar(items, user) {
    const sidebar = document.querySelector('.sidebar');
    let sidebarHTML = '';
  
    items.forEach(group => {
      if (group.title === 'ADMIN' && user.cargo !== 'Administrador') {
        return; 
      }
  
      sidebarHTML += `<ul class="sidebar-panel nav"><li class="sidetitle">${group.title}</li>`;
      group.items.forEach(item => {
        sidebarHTML += `<li><a href="${item.href}"><span class="icon ${item.colorClass}"><i class="${item.iconClass}"></i></span>${item.name}</a></li>`;
      });
      sidebarHTML += '</ul>';
    });
  
    sidebar.innerHTML = sidebarHTML;
  }

// Gera a sidebar ao carregar a página
//document.addEventListener('DOMContentLoaded', () => generateSidebar(sidebarItems));
