const breadcrumbButtonsConfig = {
  'index': [
    { href: 'index.html', iconClass: 'fa fa-light', name: 'Painel de Controlo' },
    { href: '#', iconClass: 'fa fa-refresh' },
    { href: '#', iconClass: 'fa fa-search' },
    { href: '#', iconClass: 'fa fa-line-chart', id: 'topstats' }
  ],
  'produtos': [
    { href: 'produtos-adicionar.html', iconClass: 'fa fa-plus', name: 'Adicionar Produto' }
  ],
  'produtos-adicionar': [
    { href: 'produtos.html', iconClass: 'fa fa-list', name: 'Listagem de Produtos' }
  ],
  'produtos-editar': [
    { href: 'produtos.html', iconClass: 'fa fa-list', name: 'Listagem de Produtos' }
  ],
  'produtos-visualizar': [
    { href: 'produtos.html', iconClass: 'fa fa-list', name: 'Listagem de Produtos' },
    { href: 'solicitacoes-adicionar.html', iconClass: 'fa fa-list', name: 'Nova Solicitação' }
  ],
  'beneficiarios': [
    { href: 'beneficiarios-adicionar.html', iconClass: 'fa fa-list', name: 'Novo Beneficiário' }
  ], 
  'funcionarios': [
    { href: 'funcionarios-adicionar.html', iconClass: 'fa fa-list', name: 'Novo Funcionário' }
  ]
  // Add other pages and their specific breadcrumb buttons here
};

function updateBreadcrumbAndTitle() {
  const currentPage = getCurrentPage();
  let familyName = '';

  if (currentPage.startsWith('produtos')) {
    familyName = 'Produtos';
  } else if (currentPage.startsWith('beneficiarios')) {
    familyName = 'Beneficiários';
  } else if (currentPage.startsWith('funcionarios')) {
    familyName = 'Funcionários';
  }

  const breadcrumbItems = generateBreadcrumbItems(currentPage, familyName);
  generateBreadcrumb(breadcrumbItems);

  document.querySelector('.title').innerText = familyName || getSidebarItemName(currentPage);

  const breadcrumbButtons = breadcrumbButtonsConfig[currentPage] || [];
  generateBreadcrumbButtons(breadcrumbButtons);
}

function getCurrentPage() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  return urlParts[urlParts.length - 1].split('.')[0]; // Get the current page without the extension
}

function generateBreadcrumbItems(currentPage, familyName) {
  const items = [];
  if (currentPage.startsWith('produtos')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
          if (currentPage === 'produtos-adicionar') {
            items.push({ href: 'produtos.html', name: 'Produtos' });
            items.push({ href: '#', name: 'Adicionar Produto', active: true });
          } else if (currentPage === 'produtos-editar') {
            items.push({ href: 'produtos.html', name: 'Produtos' });
            items.push({ href: '#', name: 'Editar Produto', active: true });
          } else if (currentPage === 'produtos-visualizar') {
            items.push({ href: 'produtos.html', name: 'Produtos' });
            items.push({ href: '#', name: 'Visualizar Produto', active: true });
          } else {
            items.push({ href: 'produtos.html', name: 'Produtos' });
            items.push({ href: '#', name: 'Listagem de Produtos', active: true });
          }
  } else  if (currentPage.startsWith('beneficiarios')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
    items.push({ href: 'beneficiarios.html', name: 'Listagem de Beneficiários', active: true});
          if (currentPage === 'beneficiarios-visualizar') {
            items.push({ href: 'beneficiarios-visualizar.html', name: 'Visualizar Beneficiários', active: true });
          }
          if (currentPage === 'beneficiarios-adicionar') {
            items.push({ href: 'beneficiarios-adicionar.html', name: 'Adicionar Beneficiários', active: true });
          }
  } else  if (currentPage.startsWith('solicitacoes')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
    items.push({ href: 'solicitacoes.html', name: 'Listagem de Solicitações', active: true });
  } else  if (currentPage.startsWith('funcionarios')) {
  items.push({ href: 'index.html', name: 'Painel de Controlo' });
  items.push({ href: 'funcionarios.html', name: 'Listagem de Funcionários', active: true });
          if (currentPage === 'funcionarios-visualizar') {
            items.push({ href: 'funcionarios-visualizar.html', name: 'Visualizar Funcionário', active: true });
          }
          if (currentPage === 'funcionarios-adicionar') {
            items.push({ href: 'funcionarios-adicionar.html', name: 'Adicionar Funcionário', active: true });
          }
  }
  return items;
}

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

function generateBreadcrumbButtons(buttons) {
  const breadcrumbButtons = document.getElementById('breadcrumb-buttons');
  breadcrumbButtons.innerHTML = '';
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
    breadcrumbButtons.appendChild(link);
  });
}

function getSidebarItemName(currentPage) {
  let selectedItemName = '';
  sidebarItems.forEach(group => {
    group.items.forEach(item => {
      if (item.href === currentPage + '.html') {
        selectedItemName = item.name;
      }
    });
  });
  return selectedItemName || currentPage; // Default to page name if no sidebar item found
}

document.addEventListener('DOMContentLoaded', () => {
  updateBreadcrumbAndTitle();
});
