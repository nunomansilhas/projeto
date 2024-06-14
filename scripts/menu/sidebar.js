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
            { href: 'notificacoes.html', iconClass: 'fa fa-bell-o', name: 'Notificações', colorClass: 'color9' }
      ]
  }
];

function generateSidebar(items) {
  const sidebar = document.querySelector('.sidebar');
  let sidebarHTML = '';

  items.forEach(group => {
      sidebarHTML += `<ul class="sidebar-panel nav"><li class="sidetitle">${group.title}</li>`;
      group.items.forEach(item => {
          sidebarHTML += `<li><a href="${item.href}"><span class="icon ${item.colorClass}"><i class="${item.iconClass}"></i></span>${item.name}</a></li>`;
      });
      sidebarHTML += '</ul>';
  });

  sidebar.innerHTML = sidebarHTML;
}

// Gera a sidebar ao carregar a página
document.addEventListener('DOMContentLoaded', () => generateSidebar(sidebarItems));
