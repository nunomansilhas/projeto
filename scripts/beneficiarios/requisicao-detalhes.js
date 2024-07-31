import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showRequisicaoDetalhesModal(requisicaoId) {
    if (!document.getElementById('requisicaoDetalhesModal')) {
        createRequisicaoDetalhesModal();
    }

    const modal = document.getElementById('requisicaoDetalhesModal');
    modal.dataset.requisicaoId = requisicaoId; 

    fetchRequisicaoDetalhes(requisicaoId);
    $('#requisicaoDetalhesModal').modal('show');

    document.getElementById('deleteRequisicaoBtn').addEventListener('click', () => deleteRequisicao(requisicaoId));
}

function createRequisicaoDetalhesModal() {
    const modalHtml = `
        <div class="modal fade" id="requisicaoDetalhesModal" tabindex="-1" role="dialog" aria-labelledby="requisicaoDetalhesModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="requisicaoDetalhesModalLabel">Detalhes da Requisição</h4>
                    </div>
                    <div class="modal-body">
                        <div id="requisicaoDetalhesContent"></div>
                    </div>
                    <div class="modal-footer">
                        <button id="deleteRequisicaoBtn" class="btn btn-danger"><i class="fa fa-trash-o"></i> Eliminar </button>
                        <button id="printDeclRequisicaoBtn" class="btn btn-default"><i class="fa fa-file-o"></i> Gerar Declaração</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('printDeclRequisicaoBtn').addEventListener('click', printDeclaracaoRequisicao);
    document.getElementById('deleteRequisicaoBtn').addEventListener('click', deleteRequisicao);
}

async function fetchRequisicaoDetalhes(requisicaoId) {
    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`);
        if (!response.ok) throw new Error('Erro ao buscar detalhes da requisição');
        const requisicao = await response.json();
        await populateRequisicaoDetalhes(requisicao);
    } catch (error) {
        console.error('Erro ao buscar detalhes da requisição:', error);
        Swal.fire("Erro", "Ocorreu um erro ao buscar os detalhes da requisição.", "error");
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

async function fetchDadosEmpresa() {
    try {
        const response = await fetch('http://localhost:3000/api/dadosEmpresa');
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error);
    }
}

async function populateRequisicaoDetalhes(requisicao) {
    const contentDiv = document.getElementById('requisicaoDetalhesContent');
    const beneficiario = await fetchBeneficiario(requisicao.ClienteID);
    const produto = await fetchProdutoData(requisicao.ProdutoDeApoioID);
    const funcionario = await fetchFuncionarioData(requisicao.FuncionarioID);

    contentDiv.innerHTML = `
        <p><strong>ID:</strong> #${requisicao.ID}</p>
        <p><strong>Produto:</strong> ${produto.Nome}</p>
        <p><strong>Cliente:</strong> ${beneficiario.nome}</p>
        <p><strong>Quantidade:</strong> ${requisicao.Quantidade}</p>
        <p><strong>Data da Requisição:</strong> ${new Date(requisicao.DataMovimentacao).toLocaleDateString()}</p>
        <p id="dataDevolucao"><strong>Data de Devolução:</strong> ${new Date(requisicao.DataEntrega).toLocaleDateString()}</p>
    `;

    contentDiv.dataset.beneficiarioNome = beneficiario.nome;
    contentDiv.dataset.funcionarioNome = funcionario.Nome;
    contentDiv.dataset.produtoNome = produto.Nome;
    contentDiv.dataset.produtoId = produto.ID;

    contentDiv.dataset.nomeficheiro = requisicao.ID + beneficiario.id + produto.ID;
}

async function printDeclaracaoRequisicao() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const dadosEmpresa = await fetchDadosEmpresa();
    const imgData = 'img/logo.jpg'; 

    doc.addImage(imgData, 'JPEG', 20, 15, 55, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DECLARAÇÃO DE EMPRÉSTIMO DE MATERIAL', 85, 37);

    doc.setLineWidth(0.3);
    doc.line(20, 40, 190, 40);

    const requisicaoDetalhes = document.getElementById('requisicaoDetalhesContent');
    const produto = requisicaoDetalhes.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const cliente = requisicaoDetalhes.dataset.beneficiarioNome;
    const produtoId = requisicaoDetalhes.dataset.produtoId;
    const funcionario = requisicaoDetalhes.dataset.funcionarioNome;
    const quantidade = requisicaoDetalhes.querySelector('p:nth-child(4)').textContent.split(': ')[1];
    const dataRequisicao = requisicaoDetalhes.querySelector('p:nth-child(5)').textContent.split(': ')[1];
    const dataEntrega = requisicaoDetalhes.querySelector('p:nth-child(6)').textContent.split(': ')[1];
    const nomeficheiro = requisicaoDetalhes.dataset.nomeficheiro;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${funcionario}, responsável do cliente ${cliente}; declaro que levo a título de empréstimo o seguinte material pertencente à Associação de Paralisia Cerebral de Viana do Castelo:`, 35, 65, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.text(`ID: ${produtoId}`, 35, 88);
    doc.text(`Produto: ${produto}`, 35, 95);
    doc.text(`Quantidade: ${quantidade}`, 35, 102);

    doc.text('Comprometo-me a mantê-lo devidamente cuidado e devolvê-lo logo que deixe de necessitá-lo.', 35, 115, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.text(`DATA DE EMPRÉSTIMO: ${dataRequisicao}`, 35, 145);
    doc.text(`O/A declarante: _______________________________________________`, 35, 155);

    doc.text(`DATA DE DEVOLUÇÃO: ___/___/_____`, 35, 170);
    doc.text('O/A declarante: _______________________________________________', 35, 180);

    doc.setLineWidth(0.3);
    doc.line(35, 270, 175, 270);

    doc.setFontSize(8);
    doc.text('Mod.PAF.06/0', 35, 275);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(`Contribuinte: ${dadosEmpresa.contribuinte} | ${dadosEmpresa.endereco} | ${dadosEmpresa.cidade}  `, 105, 280, { align: 'center' });
    doc.text(`${dadosEmpresa.telefone} | E-mail: ${dadosEmpresa.email}`, 105, 285, { align: 'center' });

    doc.save(`Declaracao_Requisicao_${nomeficheiro}.pdf`);
}

async function deleteRequisicao(requisicaoId) {
    try {
        const requisicaoResponse = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`);
        if (!requisicaoResponse.ok) throw new Error('Erro ao buscar detalhes da requisição');
        const requisicao = await requisicaoResponse.json();

        const produtoId = requisicao.ProdutoDeApoioID;
        const quantidadeRequisitada = requisicao.Quantidade;

        const produtoResponse = await fetch(`http://localhost:3000/api/produtos/${produtoId}`);
        if (!produtoResponse.ok) throw new Error('Erro ao buscar detalhes do produto');
        const produto = await produtoResponse.json();
        
        const novaQuantidade = produto.quantidade + quantidadeRequisitada;

        const updateResponse = await fetch(`http://localhost:3000/api/produtos/quantidade/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });
        if (!updateResponse.ok) throw new Error('Erro ao atualizar quantidade do produto');

        const deleteResponse = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`, {
            method: 'DELETE'
        });
        if (!deleteResponse.ok) throw new Error('Erro ao deletar requisição');

        await enviarNotificacao('Eliminado', `Eliminou a requisição com ID: ${requisicaoId}`);

        Swal.fire("Sucesso", "Requisição deletada com sucesso!", "success");
        $('#requisicaoDetalhesModal').modal('hide');

        window.location.reload();
    } catch (error) {
        console.error('Erro ao deletar requisição:', error);
        Swal.fire("Erro", "Ocorreu um erro ao deletar a requisição.", "error");
    }
}

async function prolongarDataDevolucao() {
    const novaData = prompt("Por favor, insira a nova data de devolução (formato: YYYY-MM-DD):");

    if (!novaData) {
        return; 
    }

    const dataValida = moment(novaData, "YYYY-MM-DD", true).isValid();

    if (!dataValida) {
        Swal.fire("Erro", "Data inválida. Por favor, insira uma data válida no formato YYYY-MM-DD.", "error");
        return;
    }

    const requisicaoId = document.getElementById('requisicaoDetalhesModal').dataset.requisicaoId;

    try {
        const response = await fetch(`http://localhost:3000/api/movimentacoes/${requisicaoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ DataEntrega: novaData })
        });

        if (!response.ok) throw new Error('Erro ao atualizar data de devolução');

        Swal.fire("Sucesso", "Data de devolução atualizada com sucesso!", "success");
        await enviarNotificacao('Editado', `A data de devolução da requisição ID: ${requisicaoId} foi atualizada para ${novaData}`);
        $('#requisicaoDetalhesModal').modal('hide');
        document.getElementById('dataDevolucao').textContent = `Data de Devolução: ${moment(novaData).format('YYYY-MM-DD')}`;
    } catch (error) {
        console.error('Erro ao atualizar data de devolução:', error);
        Swal.fire("Erro", "Ocorreu um erro ao atualizar a data de devolução.", "error");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('printDeclRequisicaoBtn').addEventListener('click', printDeclaracaoRequisicao);
    document.getElementById('deleteRequisicaoBtn').addEventListener('click', deleteRequisicao);
});
