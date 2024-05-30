const sidebarItems = [
    {
      title: 'PRINCIPAL',
      items: [
        { href: 'views/user/painel-de-control.html', iconClass: 'fa fa-home', name: 'Painel de Controle' },
        { href: 'views/user/produtos.html', iconClass: 'fa fa-archive', name: 'Produtos' },
        { href: 'views/user/solicitacoes.html', iconClass: 'fa fa-clipboard', name: 'Solicitações' },
        { href: 'views/user/beneficiarios.html', iconClass: 'fa fa-users', name: 'Beneficiários' }
      ]
    },
    {
      title: 'ADMIN',
      items: [
        { href: 'views/admin/funcionarios.html', iconClass: 'fa fa-male', name: 'Funcionários' },
        { href: 'views/admin/categorias.html', iconClass: 'fa fa-cog', name: 'Categorias' }
      ]
    }
  ];
  
  function generateSidebar(items) {
    const sidebar = document.querySelector('.sidebar');
    let sidebarHTML = '';
  
    items.forEach(group => {
      sidebarHTML += `<ul class="sidebar-panel nav"><li class="sidetitle">${group.title}</li>`;
      group.items.forEach(item => {
        sidebarHTML += `<li><a href="${item.href}"><span class="icon"><i class="${item.iconClass}"></i></span>${item.name}</a></li>`;
      });
      sidebarHTML += '</ul>';
    });
  
    sidebar.innerHTML = sidebarHTML;
  }
  
  // Gera a sidebar ao carregar a página
  document.addEventListener('DOMContentLoaded', () => generateSidebar(sidebarItems));
  