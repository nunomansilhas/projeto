// Configuration object for breadcrumb buttons specific to each page
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
  // Add other pages and their specific breadcrumb buttons here
};

// Function to generate the breadcrumb and update the page title based on the selected item in the sidebar
function updateBreadcrumbAndTitle() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const currentPage = urlParts[urlParts.length - 1].split('.')[0]; // Get the current page without the extension
  
  // Default family name for "produtos" related pages
  const familyName = currentPage.startsWith('produtos') ? 'Produtos' : '';

  // Update the breadcrumb based on the page hierarchy
  const breadcrumbItems = generateBreadcrumbItems(currentPage, familyName);
  generateBreadcrumb(breadcrumbItems);

  // Update the title of the page
  if (familyName) {
    document.querySelector('.title').innerText = familyName;
  } else {
    // Find the item in the sidebarItems that matches the current page URL
    let selectedItemName = '';
    sidebarItems.forEach(group => {
      group.items.forEach(item => {
        if (item.href === currentPage + '.html') {
          selectedItemName = item.name;
        }
      });
    });
    document.querySelector('.title').innerText = selectedItemName || currentPage; // Default to page name if no sidebar item found
  }

  // Generate breadcrumb buttons specific to the current page
  const breadcrumbButtons = breadcrumbButtonsConfig[currentPage] || [];
  generateBreadcrumbButtons(breadcrumbButtons);
}

// Function to generate breadcrumb items based on page hierarchy
function generateBreadcrumbItems(currentPage, familyName) {
  const items = [];
  if (currentPage.startsWith('produtos')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
    items.push({ href: 'produtos.html', name: 'Produtos' });
    if (currentPage === 'produtos-adicionar') {
      items.push({ href: 'produtos-adicionar.html', name: 'Adicionar Produto', active: true });
    } else if (currentPage === 'produtos-editar') {
      items.push({ href: 'produtos-editar.html', name: 'Editar Produto', active: true });
    } else {
      items.push({ href: '#', name: 'Listagem de Produtos', active: true });
    }
  } else if (currentPage.startsWith('beneficiarios')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
    items.push({ href: 'beneficiarios.html', name: 'Listagem de Beneficiários', active: true });
  } else if (currentPage.startsWith('solicitacoes')) {
    items.push({ href: 'index.html', name: 'Painel de Controlo' });
    items.push({ href: 'solicitacoes.html', name: 'Listagem de Solicitações', active: true });
  }
  return items;
}

// Function to generate the breadcrumb
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

// Function to generate the customizable buttons in the breadcrumb
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

// Generate the breadcrumb and update the title when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateBreadcrumbAndTitle();
});
