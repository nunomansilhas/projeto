import { showEditCategoriaModal, handleDelete } from './categorias-actions.js';

async function fetchCategorias() {
    const response = await fetch('http://localhost:3000/api/tiposprodutos');
    if (!response.ok) {
        throw new Error('Erro ao buscar as categorias');
    }
    return response.json();
}

async function fetchProdutos() {
    const response = await fetch('http://localhost:3000/api/produtos');
    if (!response.ok) {
        throw new Error('Erro ao buscar os produtos');
    }
    return response.json();
}

async function populateCategoriasTable() {
    try {
        const categorias = await fetchCategorias();
        const produtos = await fetchProdutos();
        const tableBody = document.querySelector('#categoriasTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        categorias.forEach(categoria => {
            const totalProdutos = produtos.filter(produto => produto.TipoProdutoID === categoria.ID).length;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${categoria.ID}</td>
                <td>${categoria.Nome}</td>
                <td>${totalProdutos}</td>
                <td class="text-right">
                    <button type="button" class="btn btn-square edit-categoria" data-categoria-id="${categoria.ID}" data-categoria-name="${categoria.Nome}">Editar</button>
                    <button type="button" class="btn btn-square delete-categoria" data-categoria-id="${categoria.ID}" data-categoria-name="${categoria.Nome}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-categoria').forEach(button => {
            button.addEventListener('click', (event) => {
                const categoriaId = event.currentTarget.dataset.categoriaId;
                showEditCategoriaModal(categoriaId);
            });
        });

        document.querySelectorAll('.delete-categoria').forEach(button => {
            button.addEventListener('click', handleDelete);
        });

    } catch (error) {
        console.error('Erro ao popular a tabela de categorias:', error);
        swal("Erro", "Ocorreu um erro ao carregar as categorias.", "error");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateCategoriasTable();
});
