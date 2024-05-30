// Function to generate the breadcrumb and update the page title based on the selected item in the sidebar
function updateBreadcrumbAndTitle() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const currentPage = urlParts[urlParts.length - 1].split('.')[0]; // Get the current page without the extension
  
  // Find the item in the sidebarItems that matches the current page URL
  let selectedItemName = '';
  sidebarItems.forEach(group => {
    group.items.forEach(item => {
      if (item.href === currentPage + '.html') {
        selectedItemName = item.name;
      }
    });
  });

  // Update the breadcrumb
  const breadcrumbItems = [
    { href: '#', name: selectedItemName, active: true }
  ];
  generateBreadcrumb(breadcrumbItems);

  // Update the title of the page
  document.querySelector('.title').innerText = selectedItemName;
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

// Definição dos botões customizáveis no breadcrumb
const breadcrumbButtons = [
  { href: 'index.html', iconClass: 'fa fa-light', name: 'Painel de Controlo' },
  { href: '#', iconClass: 'fa fa-refresh' },
  { href: '#', iconClass: 'fa fa-search' },
  { href: '#', iconClass: 'fa fa-line-chart', id: 'topstats' }
];

// Função para gerar os botões customizáveis no breadcrumb
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
  //generateBreadcrumbButtons(breadcrumbButtons);
});
