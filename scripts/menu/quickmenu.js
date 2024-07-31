const quickMenuItems = [
  { href: 'produtos-adicionar.html', iconClass: 'fa falist fa-archive', name: 'Produto de Apoio' },
  { href: 'categorias.html', iconClass: 'fa falist fa-cog', name: 'Categoria', adminOnly: true },
  { href: 'beneficiarios-adicionar.html', iconClass: 'fa falist fa-users', name: 'Beneficiário' }
];

function generateQuickMenu(items, isAdmin) {
  const quickMenu = document.getElementById('quick-menu');
  quickMenu.innerHTML = '';
  items.forEach(item => {
    if (item.adminOnly && !isAdmin) {
      return; // Skip admin-only items for non-admin users
    }
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.innerHTML = `<i class="${item.iconClass}"></i>${item.name}`;
    listItem.appendChild(link);
    quickMenu.appendChild(listItem);
  });
}

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

// Gerar o quick menu no carregamento da página
document.addEventListener('DOMContentLoaded', async () => {
  const sessionUser = await fetchSessionUser();
  if (sessionUser) {
    const isAdmin = sessionUser.cargo === 'Administrador';
    generateQuickMenu(quickMenuItems, isAdmin);
  }
});
