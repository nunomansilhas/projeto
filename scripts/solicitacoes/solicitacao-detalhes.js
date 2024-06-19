import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showSolicitacaoDetalhesModal(solicitacaoId) {
    if (!document.getElementById('solicitacaoDetalhesModal')) {
        createSolicitacaoDetalhesModal();
    }

    const modal = document.getElementById('solicitacaoDetalhesModal');
    modal.dataset.solicitacaoId = solicitacaoId; // Armazena o ID da solicitação no modal

    fetchSolicitacaoDetalhes(solicitacaoId);
    $('#solicitacaoDetalhesModal').modal('show');

    document.getElementById('deleteSolicitacaoBtn').addEventListener('click', () => deleteSolicitacao(solicitacaoId));
}

function createSolicitacaoDetalhesModal() {
    const modalHtml = `
        <div class="modal fade" id="solicitacaoDetalhesModal" tabindex="-1" role="dialog" aria-labelledby="solicitacaoDetalhesModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="solicitacaoDetalhesModalLabel">Detalhes da Solicitação</h4>
                    </div>
                    <div class="modal-body">
                        <div id="solicitacaoDetalhesContent"></div>
                    </div>
                    <div class="modal-footer">
                        <button id="deleteSolicitacaoBtn" class="btn btn-danger"><i class="fa fa-trash-o"></i> Eliminar </button>
                        <button id="prolongarDataBtn" class="btn btn-warning" style="display: none;"><i class="fa fa-calendar-plus-o"></i> Prolongar Data</button>
                        <button id="printDeclSolicitacaoBtn" class="btn btn-default"><i class="fa fa-file-o"></i> Gerar Declaração</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('printDeclSolicitacaoBtn').addEventListener('click', printDeclaracaoSolicitacao);
    document.getElementById('deleteSolicitacaoBtn').addEventListener('click', deleteSolicitacao);
    document.getElementById('prolongarDataBtn').addEventListener('click', prolongarDataDevolucao);
}

async function fetchSolicitacaoDetalhes(solicitacaoId) {
    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`);
        if (!response.ok) throw new Error('Erro ao buscar detalhes da solicitação');
        const solicitacao = await response.json();
        await populateSolicitacaoDetalhes(solicitacao);
    } catch (error) {
        console.error('Erro ao buscar detalhes da solicitação:', error);
        swal("Erro", "Ocorreu um erro ao buscar os detalhes da solicitação.", "error");
    }
}

async function fetchBeneficiario(id) {
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados do beneficiário');
    }
    return response.json();
}

async function fetchProdutoData(produtoId) {
    const response = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do produto');
    return response.json();
}

async function fetchFuncionarioData(funcionarioId) {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do funcionário');
    return response.json();
}

async function populateSolicitacaoDetalhes(solicitacao) {
    const contentDiv = document.getElementById('solicitacaoDetalhesContent');
    const beneficiario = await fetchBeneficiario(solicitacao.ClienteID);
    const produto = await fetchProdutoData(solicitacao.ProdutoDeApoioID);
    const funcionario = await fetchFuncionarioData(solicitacao.FuncionarioID);

    contentDiv.innerHTML = `
        <p><strong>ID:</strong> #${solicitacao.ID}</p>
        <p><strong>Produto:</strong> ${produto.Nome}</p>
        <p><strong>Cliente:</strong> ${beneficiario.nome}</p>
        <p><strong>Quantidade:</strong> ${solicitacao.Quantidade}</p>
        <p><strong>Data da Solicitação:</strong> ${new Date(solicitacao.DataMovimentacao).toLocaleDateString()}</p>
        <p id="dataDevolucao"><strong>Data de Devolução:</strong> ${new Date(solicitacao.DataEntrega).toLocaleDateString()}</p>
    `;

    // Armazena dados do beneficiário e produto para uso na geração do PDF
    contentDiv.dataset.beneficiarioNome = beneficiario.nome;
    contentDiv.dataset.funcionarioNome = funcionario.Nome;
    contentDiv.dataset.produtoNome = produto.Nome;
    contentDiv.dataset.produtoId = produto.ID;
    contentDiv.dataset.TipoMovimentacao = solicitacao.TipoMovimentacao;

    contentDiv.dataset.nomeficheiro = solicitacao.ID + beneficiario.id + produto.ID;

    // Mostrar o botão "Prolongar Data" apenas se o tipo de movimentação for "Saída"
    if (solicitacao.TipoMovimentacao === 'Saída') {
        document.getElementById('prolongarDataBtn').style.display = 'inline-block';
    } else {
        document.getElementById('prolongarDataBtn').style.display = 'none';
    }
}

function printDeclaracaoSolicitacao() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Carregar a imagem do logotipo
    const imgData = 'img/logo.jpg'; // Caminho para a imagem do logotipo

    // Adicionar o logotipo ao PDF
    doc.addImage(imgData, 'JPEG', 20, 15, 55, 20);

    // Adicionar título ao lado do logotipo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DECLARAÇÃO DE EMPRÉSTIMO DE MATERIAL', 85, 37);

    // Adicionar a linha horizontal abaixo do logotipo e título
    doc.setLineWidth(0.3);
    doc.line(20, 40, 190, 40);

    // Coletar dados do modal
    const solicitacaoDetalhes = document.getElementById('solicitacaoDetalhesContent');
    const produto = solicitacaoDetalhes.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const cliente = solicitacaoDetalhes.dataset.beneficiarioNome;
    const produtoId = solicitacaoDetalhes.dataset.produtoId;
    const funcionario = solicitacaoDetalhes.dataset.funcionarioNome;
    const TipoMovimentacao = solicitacaoDetalhes.dataset.TipoMovimentacao;
    const quantidade = solicitacaoDetalhes.querySelector('p:nth-child(4)').textContent.split(': ')[1];
    const dataSolicitacao = solicitacaoDetalhes.querySelector('p:nth-child(5)').textContent.split(': ')[1];
    const dataEntrega = solicitacaoDetalhes.querySelector('p:nth-child(6)').textContent.split(': ')[1];
    const nomeficheiro = solicitacaoDetalhes.dataset.nomeficheiro;

    // Adicionar conteúdo ao PDF com quebra de linha para textos longos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${funcionario}, responsável do cliente ${cliente}; declaro que levo a título de empréstimo o seguinte material pertencente à Associação de Paralisia Cerebral de Viana do Castelo:`, 35, 65, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.text(`ID: ${produtoId}`, 35, 88);
    doc.text(`Produto: ${produto}`, 35, 95);
    doc.text(`Quantidade: ${quantidade}`, 35, 102);

    doc.text('Comprometo-me a mantê-lo devidamente cuidado e devolvê-lo logo que deixe de necessitá-lo.', 35, 115, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.text(`DATA DE EMPRÉSTIMO: ${dataSolicitacao}`, 35, 145);
    doc.text(`O/A declarante: _______________________________________________`, 35, 155);

    // Adicionar a data de devolução conforme o tipo de movimentação
    if (TipoMovimentacao === 'Entrada') {
        doc.text(`DATA DE DEVOLUÇÃO: ${dataEntrega}`, 35, 170);
    } else {
        doc.text(`DATA DE DEVOLUÇÃO: ___/___/_____`, 35, 170);
    }

    doc.text('O/A declarante: _______________________________________________', 35, 180);

    // Adicionar a linha horizontal acima do rodape
    doc.setLineWidth(0.3);
    doc.line(35, 270, 175, 270);

    // Adicionar conteúdo ao rodapé
    doc.setFontSize(8);
    doc.text('Mod.PAF.06/0', 35, 275);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('Contribuinte N. 516 121 332 | Rua 25 de Abril, nº. 9 |  4925-010 Santa Marta de Portuzelo | VIANA DO CASTELO', 105, 280, { align: 'center' });
    doc.text('Telefone: 258 839 050 | E-mail: geral@apcvc.pt', 105, 285, { align: 'center' });

    doc.save(`Declaracao_Solicitacao_${nomeficheiro}.pdf`);
}


async function deleteSolicitacao(solicitacaoId) {
    try {
        // Primeiro, buscar a solicitação para obter os detalhes necessários
        const solicitacaoResponse = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`);
        if (!solicitacaoResponse.ok) throw new Error('Erro ao buscar detalhes da solicitação');
        const solicitacao = await solicitacaoResponse.json();

        // Recuperar a quantidade e o ID do produto
        const produtoId = solicitacao.ProdutoDeApoioID;
        const quantidadeSolicitada = solicitacao.Quantidade;

        // Buscar o produto para obter a quantidade atual
        const produtoResponse = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
        if (!produtoResponse.ok) throw new Error('Erro ao buscar detalhes do produto');
        const produto = await produtoResponse.json();
        
        // Calcular a nova quantidade
        const novaQuantidade = produto.quantidade + quantidadeSolicitada;

        // Atualizar a quantidade do produto
        const updateResponse = await fetch(`http://localhost:3000/api/produtos/quantidade/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });
        if (!updateResponse.ok) throw new Error('Erro ao atualizar quantidade do produto');

        // Depois de atualizar a quantidade do produto, deletar a solicitação
        const deleteResponse = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`, {
            method: 'DELETE'
        });
        if (!deleteResponse.ok) throw new Error('Erro ao deletar solicitação');

        await enviarNotificacao('Eliminado', `Eliminou a solicitação com ID: ${solicitacaoId}`);

        swal("Sucesso", "Solicitação deletada com sucesso!", "success");
        $('#solicitacaoDetalhesModal').modal('hide');

        // Atualize a lista de solicitações ou redirecione conforme necessário
        window.location.reload();
    } catch (error) {
        console.error('Erro ao deletar solicitação:', error);
        swal("Erro", "Ocorreu um erro ao deletar a solicitação.", "error");
    }
}

async function prolongarDataDevolucao() {
    const novaData = prompt("Por favor, insira a nova data de devolução (formato: YYYY-MM-DD):");

    if (!novaData) {
        return; // Se o usuário cancelar o prompt
    }

    const dataValida = moment(novaData, "YYYY-MM-DD", true).isValid();

    if (!dataValida) {
        swal("Erro", "Data inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.", "error");
        return;
    }

    const solicitacaoId = document.getElementById('solicitacaoDetalhesModal').dataset.solicitacaoId;

    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${solicitacaoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ DataEntrega: novaData })
        });

        if (!response.ok) throw new Error('Erro ao atualizar data de devolução');

        swal("Sucesso", "Data de devolução atualizada com sucesso!", "success");
        await enviarNotificacao('Editado', `A data de devolução da solicitação ID: ${solicitacaoId} foi atualizada para ${novaData}`);
        $('#solicitacaoDetalhesModal').modal('hide');
        // Atualize a visualização para refletir a nova data de devolução
        document.getElementById('dataDevolucao').textContent = `Data de Devolução: ${moment(novaData).format('YYYY-MM-DD')}`;
    } catch (error) {
        console.error('Erro ao atualizar data de devolução:', error);
        swal("Erro", "Ocorreu um erro ao atualizar a data de devolução.", "error");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('printDeclSolicitacaoBtn').addEventListener('click', printDeclaracaoSolicitacao);
    document.getElementById('deleteSolicitacaoBtn').addEventListener('click', deleteSolicitacao);
    document.getElementById('prolongarDataBtn').addEventListener('click', prolongarDataDevolucao);
});
