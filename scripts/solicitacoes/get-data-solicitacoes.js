import { showSolicitacaoDetalhesModal } from './solicitacao-detalhes.js';
import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

async function fetchSolicitacoes() {
  const response = await fetch('http://localhost:3000/api/movimentacoes');
  return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
  const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
  return response.json();
}

async function fetchClienteData(clienteId) {
  try {
    const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`);
    if (!response.ok) throw new Error('Cliente não encontrado');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
    return { nome: 'Cliente desconhecido' }; 
  }
}

async function fetchProdutoData(produtoId) {
  const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados do produto');
  return response.json();
}

async function populateDataTable() {
  const solicitacoes = await fetchSolicitacoes();

  const tableBody = document.querySelector('#solicitacoesTable tbody');
  tableBody.innerHTML = ''; 

  for (const solicitacao of solicitacoes) {
    const funcionarioData = await fetchFuncionarioData(solicitacao.FuncionarioID);
    const clienteData = await fetchClienteData(solicitacao.ClienteID);
    const tipoMovimentacaoClass = solicitacao.TipoMovimentacao === 'Entrada' ? 'label label-success' : 'label label-info';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${solicitacao.ID}</td>
      <td>${solicitacao.ProdutoDeApoioID}</td>
      <td><span class="${tipoMovimentacaoClass}">${solicitacao.TipoMovimentacao}</span></td>
      <td>${solicitacao.Quantidade}</td>
      <td>${new Date(solicitacao.DataMovimentacao).toLocaleDateString()}</td>
      <td>${new Date(solicitacao.DataEntrega).toLocaleDateString()}</td>
      <td>${funcionarioData.Nome}</td>
      <td>${clienteData.nome}</td>
      <td>
        <button type="button" class="btn btn-square ver-mais-solicitacao" data-solicitacao-id="${solicitacao.ID}">Ver Mais</button>
      </td>
      <td>
        ${solicitacao.TipoMovimentacao === 'Saída' ? `<button type="button" class="btn btn-square devolver-artigo" data-solicitacao-id="${solicitacao.ID}">Devolver Artigo</button>` : ''}
      </td>
      <td>
        ${solicitacao.TipoMovimentacao === 'Saída' ? `<button type="button" class="btn btn-square prolongar-data" data-solicitacao-id="${solicitacao.ID}">Prolongar Data</button>` : ''}
      </td>
    `;
    tableBody.appendChild(row);
  }

  const table = $('#solicitacoesTable').DataTable({
    language: {
        info: "Mostrar página _PAGE_ de _PAGES_",
        infoEmpty: "Nenhuma entrada disponível",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        lengthMenu: "Mostrar _MENU_ entradas por página",
        zeroRecords: "Não foi encontrada nenhuma Solicitação",
        search: "Procurar:",
        paginate: {
            first: "Primeiro",
            last: "Último",
            next: "Próximo",
            previous: "Anterior"
        }
    },
    drawCallback: function() {
      document.querySelectorAll('.ver-mais-solicitacao').forEach(button => {
        button.addEventListener('click', (event) => {
          const solicitacaoId = event.currentTarget.getAttribute('data-solicitacao-id');
          showSolicitacaoDetalhesModal(solicitacaoId);
        });
      });

      document.querySelectorAll('.devolver-artigo').forEach(button => {
        button.addEventListener('click', async (event) => {
          const solicitacaoId = event.currentTarget.getAttribute('data-solicitacao-id');
          await confirmarDevolucaoArtigo(solicitacaoId);
        });
      });

      document.querySelectorAll('.prolongar-data').forEach(button => {
        button.addEventListener('click', async (event) => {
          const solicitacaoId = event.currentTarget.getAttribute('data-solicitacao-id');
          await prolongarDataDevolucao(solicitacaoId);
        });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', populateDataTable);

async function confirmarDevolucaoArtigo(solicitacaoId) {
  try {
    const solicitacao = await fetchSolicitacao(solicitacaoId);
    const dataAtual = solicitacao.DataEntrega ? new Date(solicitacao.DataEntrega).toISOString().split('T')[0] : '';

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
        if (new Date(dataDevolucao) < new Date(solicitacao.DataMovimentacao)) {
          Swal.showValidationMessage('A data de devolução não pode ser anterior à data de requerimento.');
          return false;
        }
        return dataDevolucao;
      }
    });

    if (formValues) {
      const dataFormatada = new Date(formValues).toISOString().split('T')[0];
      await devolverArtigo(solicitacaoId, dataFormatada);
    }
  } catch (error) {
    console.error('Erro ao confirmar a devolução do artigo:', error);
    Swal.fire("Erro", "Ocorreu um erro ao confirmar a devolução do artigo.", "error");
  }
}

async function devolverArtigo(solicitacaoId, novaDataDevolucao) {
  try {
    const response = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`, {
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

    await enviarNotificacao('Artigo Devolvido', `O artigo com ID: ${solicitacaoId} foi devolvido com sucesso.`);

    Swal.fire("Sucesso", "Artigo devolvido com sucesso!", "success");
    window.location.reload();
  } catch (error) {
    console.error('Erro ao devolver o artigo:', error);
    Swal.fire("Erro", "Ocorreu um erro ao devolver o artigo.", "error");
  }
}

async function fetchSolicitacao(solicitacaoId) {
  const response = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`);
  if (!response.ok) throw new Error('Erro ao buscar dados da solicitação');
  return response.json();
}

async function prolongarDataDevolucao(solicitacaoId) {
  try {
    const solicitacao = await fetchSolicitacao(solicitacaoId);
    const dataAtual = solicitacao.DataEntrega ? new Date(solicitacao.DataEntrega).toISOString().split('T')[0] : '';

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
        if (new Date(novaData) < new Date(solicitacao.DataMovimentacao)) {
          Swal.showValidationMessage('A data de devolução não pode ser anterior à data de requerimento.');
          return false;
        }
        return novaData;
      }
    });

    if (formValues) {
      const dataFormatada = new Date(formValues).toISOString().split('T')[0];
      await atualizarDataDevolucao(solicitacaoId, dataFormatada);
    }
  } catch (error) {
    console.error('Erro ao prolongar a data de devolução:', error);
    Swal.fire("Erro", "Ocorreu um erro ao prolongar a data de devolução.", "error");
  }
}

async function atualizarDataDevolucao(solicitacaoId, novaDataDevolucao) {
  try {
    const response = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ DataEntrega: novaDataDevolucao })
    });

    if (!response.ok) throw new Error('Erro ao atualizar data de devolução');

    await enviarNotificacao('Editado', `A data de devolução da solicitação ID: ${solicitacaoId} foi atualizada para ${novaDataDevolucao}`);
    Swal.fire("Sucesso", "Data de devolução atualizada com sucesso!", "success");
    window.location.reload();
  } catch (error) {
    console.error('Erro ao atualizar data de devolução:', error);
    Swal.fire("Erro", "Ocorreu um erro ao atualizar a data de devolução.", "error");
  }
}
