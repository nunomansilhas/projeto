// Definição dos itens do breadcrumb
const breadcrumbItems = [
    { href: '#', name: 'Painel de Controle' },
    { href: '#', name: 'Páginas Extras' },
    { href: '#', name: 'Página em Branco', active: true }
  ];
  
  // Definição dos botões customizáveis no breadcrumb
  const breadcrumbButtons = [
    { href: 'index.html', iconClass: 'fa fa-light', name: 'Painel de Controle' },
    { href: '#', iconClass: 'fa fa-refresh' },
    { href: '#', iconClass: 'fa fa-search' },
    { href: '#', iconClass: 'fa fa-line-chart', id: 'topstats' }
  ];
  
  // Função para gerar o breadcrumb
  function generateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = '';
    items.forEach(item => {
      const listItem = document.createElement('li');
      if (item.active) {
        listItem.classList.add('active');
      }
      const link = document.createElement('a');
      link.href = item.href;
      link.innerText = item.name;
      listItem.appendChild(link);
      breadcrumb.appendChild(listItem);
    });
  }
  
  // Função para gerar os botões customizáveis no breadcrumb
  function generateBreadcrumbButtons(buttons) {
    const breadcrumbButtonsContainer = document.getElementById('breadcrumb-buttons');
    breadcrumbButtonsContainer.innerHTML = '';
    buttons.forEach(button => {
      const link = document.createElement('a');
      link.href = button.href;
      link.className = 'btn btn-light';
      if (button.iconClass) {
        const icon = document.createElement('i');
        icon.className = button.iconClass;
        link.appendChild(icon);
      }
      if (button.name) {
        link.innerText = button.name;
      }
      if (button.id) {
        link.id = button.id;
      }
      breadcrumbButtonsContainer.appendChild(link);
    });
  }
  
  // Gerar o breadcrumb e os botões no carregamento da página
  document.addEventListener('DOMContentLoaded', () => {
    generateBreadcrumb(breadcrumbItems);
    generateBreadcrumbButtons(breadcrumbButtons);
  });
  