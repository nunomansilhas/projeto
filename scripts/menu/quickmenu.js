
const quickMenuItems = [
    { href: '#', iconClass: 'fa falist fa-archive', name: 'Produto de Apoio' },
    { href: '#', iconClass: 'fa falist fa-cog', name: 'Categoria' },
    { href: '#', iconClass: 'fa falist fa-users', name: 'Beneficiário' }
  ];
  

  function generateQuickMenu(items) {
    const quickMenu = document.getElementById('quick-menu');
    quickMenu.innerHTML = '';
    items.forEach(item => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      link.innerHTML = `<i class="${item.iconClass}"></i>${item.name}`;
      listItem.appendChild(link);
      quickMenu.appendChild(listItem);
    });
  }
  
  // Gerar o quick menu no carregamento da página
  document.addEventListener('DOMContentLoaded', () => {
    generateQuickMenu(quickMenuItems);
  });
  