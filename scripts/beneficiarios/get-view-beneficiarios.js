import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; 
import { showEditBeneficiarioModal } from './beneficiarios-editar.js'; 
import { confirmDelete, deleteBeneficiary } from './beneficiario-eliminar.js'; 
import { showAddDoacaoModal } from './doacao-adicionar.js'; 
import { showAddRequisicaoModal } from './requisicao-adicionar.js'; 
import { showDoacaoDetalhesModal } from './doacao-detalhes.js';
import { showRequisicaoDetalhesModal } from './requisicao-detalhes.js';

async function fetchBeneficiario(id) {
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados do beneficiário');
    }
    return response.json();
}

async function fetchMovimentacoes() {
    const response = await fetch(`http://localhost:3000/api/movimentacoes`);
    if (!response.ok) {
        throw new Error('Erro ao buscar as movimentações de inventário');
    }
    return response.json();
}

async function fetchDoacoes(id) {
    const response = await fetch(`http://localhost:3000/api/doacoes/cliente/${id}`);
    if (!response.ok) {
        return [];
    }
    return response.json();
}

async function fetchProdutoData(produtoId) {
    const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do produto');
    return response.json();
}

async function fetchTiposProdutos() {
    const response = await fetch(`http://localhost:3000/api/tiposprodutos`);
    if (!response.ok) throw new Error('Erro ao buscar tipos de produtos');
    return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
    return response.json();
}

async function fetchMovimentacao(requisicaoId) {
    const response = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados da movimentação');
    }
    return response.json();
}

async function populateBeneficiarioData(id) {
    try {
        const beneficiario = await fetchBeneficiario(id);
        document.getElementById('beneficiario-nome').textContent = beneficiario.nome;
        document.getElementById('beneficiario-email').textContent = beneficiario.email;
        document.getElementById('beneficiario-telefone').textContent = beneficiario.telemovel;
        document.getElementById('beneficiario-endereco').textContent = beneficiario.morada;

        const imagemPerfil = document.getElementById('beneficiario-imagem');
        imagemPerfil.src = beneficiario.image_profile;
        
        imagemPerfil.onerror = () => {
            imagemPerfil.src = "img/default-avatar.png";
        };

        document.querySelector('.edit-beneficiario').dataset.beneficiarioId = beneficiario.id;
        document.querySelector('.edit-beneficiario').dataset.beneficiarioName = beneficiario.nome;
        document.querySelector('.delete-beneficiario').dataset.beneficiarioId = beneficiario.id;
        document.querySelector('.delete-beneficiario').dataset.beneficiarioName = beneficiario.nome;
    } catch (error) {
        console.error('Erro ao popular os dados do beneficiário:', error);
        Swal.fire("Erro", "Ocorreu um erro ao carregar os dados do beneficiário.", "error");
    }
}

async function populateMovimentacoesTable(movimentacoes) {
    try {
        const tableBody = document.querySelector('#movimentacoesTable tbody');
        tableBody.innerHTML = ''; 

        if (movimentacoes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="9" class="text-center">Não existem movimentações para este beneficiário</td>`;
            tableBody.appendChild(row);
        } else {
            for (const movimentacao of movimentacoes) {
                const produtoData = await fetchProdutoData(movimentacao.ProdutoDeApoioID);
                const funcionarioData = await fetchFuncionarioData(movimentacao.FuncionarioID);

                const tipoMovimentacaoClass = movimentacao.TipoMovimentacao === 'Entrada' ? 'label label-success' : 'label label-primary';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${movimentacao.ID}</td>
                    <td>(ID: ${produtoData.ID || 'ID Desconhecido'}) ${produtoData.Nome || 'Produto Desconhecido'}</td>
                    <td>${funcionarioData.Nome || 'Funcionario Desconhecido'}</td>
                    <td>${new Date(movimentacao.DataMovimentacao).toLocaleDateString()}</td>
                    <td>${movimentacao.Quantidade}</td>
                    <td><span class="${tipoMovimentacaoClass}">${movimentacao.TipoMovimentacao}</span></td>
                    <td>
                        <button type="button" class="btn btn-square ver-mais-requisicao" data-requisicao-id="${movimentacao.ID}">Ver Mais</button></td>
                    <td>
                        ${movimentacao.TipoMovimentacao === 'Saída' ? `<button type="button" class="btn btn-square devolver-artigo" data-requisicao-id="${movimentacao.ID}">Devolver Artigo</button>` : ''}
                    </td>
                    <td>
                        ${movimentacao.TipoMovimentacao === 'Saída' ? `<button type="button" class="btn btn-square prolongar-data" data-requisicao-id="${movimentacao.ID}">Prolongar Data</button>` : ''}
                    </td>
                `;
                tableBody.appendChild(row);
            }

            document.querySelectorAll('.ver-mais-requisicao').forEach(button => {
                button.addEventListener('click', (event) => {
                    const requisicaoId = event.currentTarget.getAttribute('data-requisicao-id');
                    showRequisicaoDetalhesModal(requisicaoId);
                });
            });

            document.querySelectorAll('.devolver-artigo').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const requisicaoId = event.currentTarget.getAttribute('data-requisicao-id');
                    await confirmarDevolucaoArtigo(requisicaoId);
                });
            });

            document.querySelectorAll('.prolongar-data').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const requisicaoId = event.currentTarget.getAttribute('data-requisicao-id');
                    await prolongarDataDevolucao(requisicaoId);
                });
            });
        }
    } catch (error) {
        console.error('Erro ao popular a tabela de movimentações:', error);
        Swal.fire("Erro", "Ocorreu um erro ao carregar as movimentações de inventário.", "error");
    }
}

async function confirmarDevolucaoArtigo(requisicaoId) {
    try {
        const movimentacao = await fetchMovimentacao(requisicaoId);
        const dataAtual = movimentacao.DataEntrega ? new Date(movimentacao.DataEntrega).toISOString().split('T')[0] : '';

        const { value: formValues } = await Swal.fire({
            title: 'Confirmar Devolução',
            html:
                '<p>Tem certeza de que deseja devolver o artigo?</p>' +
                `<label for="dataDevolucao">Data de Devolução:</label>` +
                `<input type="date" id="dataDevolucao" class="swal2-input" value="${dataAtual}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const dataDevolucao = document.getElementById('dataDevolucao').value;
                if (!dataDevolucao) {
                    Swal.showValidationMessage('Por favor, insira uma data de devolução válida.');
                    return false;
                }
                if (new Date(dataDevolucao) < new Date(movimentacao.DataMovimentacao)) {
                    Swal.showValidationMessage('A data de devolução não pode ser anterior à data de requerimento.');
                    return false;
                }
                return dataDevolucao;
            },
            didOpen: () => {
                const dataInput = document.getElementById('dataDevolucao');
                dataInput.addEventListener('input', () => {
                    Swal.resetValidationMessage();
                });
            }
        });

        if (formValues) {
            const dataFormatada = new Date(formValues).toISOString().split('T')[0]; 
            await devolverArtigo(requisicaoId, dataFormatada);
        }
    } catch (error) {
        console.error('Erro ao confirmar a devolução do artigo:', error);
        Swal.fire("Erro", "Ocorreu um erro ao confirmar a devolução do artigo.", "error");
    }
}

async function devolverArtigo(requisicaoId, novaDataDevolucao) {
    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TipoMovimentacao: 'Entrada',
                DataEntrega: novaDataDevolucao || new Date().toISOString().split('T')[0]
            })
        });

        if (!response.ok) throw new Error('Erro ao devolver o artigo');

        await enviarNotificacao('Artigo Devolvido', `O artigo com ID: ${requisicaoId} foi devolvido com sucesso.`);

        Swal.fire("Sucesso", "Artigo devolvido com sucesso!", "success");
        window.location.reload();
    } catch (error) {
        console.error('Erro ao devolver o artigo:', error);
        Swal.fire("Erro", "Ocorreu um erro ao devolver o artigo.", "error");
    }
}

async function prolongarDataDevolucao(requisicaoId) {
    try {
        const movimentacao = await fetchMovimentacao(requisicaoId);
        const dataAtual = movimentacao.DataEntrega ? new Date(movimentacao.DataEntrega).toISOString().split('T')[0] : '';

        const { value: formValues } = await Swal.fire({
            title: 'Prolongar Data de Devolução',
            html:
                '<p>Por favor, insira a nova data de devolução:</p>' +
                `<input type="date" id="dataDevolucao" class="swal2-input" value="${dataAtual}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const novaData = document.getElementById('dataDevolucao').value;
                if (!novaData) {
                    Swal.showValidationMessage('Por favor, insira uma data de devolução válida.');
                    return false;
                }
                if (new Date(novaData) < new Date(movimentacao.DataMovimentacao)) {
                    Swal.showValidationMessage('A data de devolução não pode ser anterior à data de requerimento.');
                    return false;
                }
                return novaData;
            },
            didOpen: () => {
                const dataInput = document.getElementById('dataDevolucao');
                dataInput.addEventListener('input', () => {
                    Swal.resetValidationMessage();
                });
            }
        });

        if (formValues) {
            const dataFormatada = new Date(formValues).toISOString().split('T')[0]; 
            await atualizarDataDevolucao(requisicaoId, dataFormatada);
        }
    } catch (error) {
        console.error('Erro ao prolongar a data de devolução:', error);
        Swal.fire("Erro", "Ocorreu um erro ao prolongar a data de devolução.", "error");
    }
}

async function atualizarDataDevolucao(requisicaoId, novaDataDevolucao) {
    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ DataEntrega: novaDataDevolucao })
        });

        if (!response.ok) throw new Error('Erro ao atualizar data de devolução');

        Swal.fire("Sucesso", "Data de devolução atualizada com sucesso!", "success");
        await enviarNotificacao('Editado', `A data de devolução da requisição ID: ${requisicaoId} foi atualizada para ${novaDataDevolucao}`);
        $('#requisicaoDetalhesModal').modal('hide');
        const dataDevolucaoElement = document.getElementById('dataDevolucao');
        if (dataDevolucaoElement) {
            dataDevolucaoElement.textContent = `Data de Devolução: ${moment(novaDataDevolucao).format('YYYY-MM-DD')}`;
        }
    } catch (error) {
        console.error('Erro ao atualizar data de devolução:', error);
        Swal.fire("Erro", "Ocorreu um erro ao atualizar a data de devolução.", "error");
    }
}

async function populateMovimentacoes(id) {
    try {
        const movimentacoes = await fetchMovimentacoes();
        const beneficiarioMovimentacoes = movimentacoes.filter(mov => mov.ClienteID == id); 
        await populateMovimentacoesTable(beneficiarioMovimentacoes);
    } catch (error) {
        console.error('Erro ao buscar as movimentações de inventário:', error);
        Swal.fire("Erro", "Ocorreu um erro ao buscar as movimentações de inventário.", "error");
    }
}

async function populateDoacoesTable(doacoes, tiposProdutos) {
    try {
        const tableBody = document.querySelector('#doacoesTableBody');
        tableBody.innerHTML = ''; 

        if (doacoes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" class="text-center">Não existem doações para este beneficiário</td>`;
            tableBody.appendChild(row);
        } else {
            for (const doacao of doacoes) {
                const produtoData = await fetchProdutoData(doacao.ProdutoID);
                const tipoProduto = tiposProdutos.find(tipo => tipo.ID === produtoData.TipoProdutoID);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produtoData.ID}</td>
                    <td>${produtoData.Nome || 'Produto Desconhecido'}</td>
                    <td>${doacao.Quantidade}</td>
                    <td><button type="button" class="btn btn-square ver-mais-doacao" data-doacao-id="${doacao.ID}">Ver Mais</button></td>
                `;
                tableBody.appendChild(row);
            }

            document.querySelectorAll('.ver-mais-doacao').forEach(button => {
                button.addEventListener('click', (event) => {
                    const doacaoId = event.currentTarget.getAttribute('data-doacao-id');
                    showDoacaoDetalhesModal(doacaoId);
                });
            });
        }
    } catch (error) {
        console.error('Erro ao popular a tabela de doações:', error);
        Swal.fire("Erro", "Ocorreu um erro ao carregar as doações.", "error");
    }
}

async function populateDoacoes(id) {
    try {
        const doacoes = await fetchDoacoes(id);
        const tiposProdutos = await fetchTiposProdutos();
        await populateDoacoesTable(doacoes, tiposProdutos);
    } catch (error) {
        console.error('Erro ao buscar as doações:', error);
        Swal.fire("Erro", "Ocorreu um erro ao buscar as doações.", "error");
    }
}

async function handleDelete(event) {
    event.preventDefault();
    const beneficiarioId = event.currentTarget.dataset.beneficiarioId;
    const beneficiarioNome = event.currentTarget.dataset.beneficiarioName;
    const confirmed = await confirmDelete();
    if (confirmed) {
        await deleteBeneficiary(beneficiarioId, beneficiarioNome);
        window.location.href = 'beneficiarios.html';
    }
}

function getBeneficiarioIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', async () => {
    const beneficiarioId = getBeneficiarioIdFromUrl();
    if (beneficiarioId) {
        await populateBeneficiarioData(beneficiarioId);
        await populateMovimentacoes(beneficiarioId);
        await populateDoacoes(beneficiarioId);

        document.querySelector('.edit-beneficiario').addEventListener('click', async () => {
            const beneficiario = await fetchBeneficiario(beneficiarioId);
            showEditBeneficiarioModal(beneficiario);
        });
        document.querySelector('.delete-beneficiario').addEventListener('click', handleDelete);
        document.querySelector('.add-doacao').addEventListener('click', showAddDoacaoModal);
        document.querySelector('.add-requisicao').addEventListener('click', showAddRequisicaoModal);
        
    } else {
        Swal.fire("Erro", "ID do beneficiário não encontrado na URL.", "error");
    }
});
