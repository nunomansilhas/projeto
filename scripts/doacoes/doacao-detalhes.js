import { enviarNotificacao } from '../acoes/enviar-notificacao.js';

export function showDoacaoDetalhesModal(doacaoId) {
    if (!document.getElementById('doacaoDetalhesModal')) {
        createDoacaoDetalhesModal();
    }

    fetchDoacaoDetalhes(doacaoId);
    $('#doacaoDetalhesModal').modal('show');

    document.getElementById('deleteDoacaoBtn').addEventListener('click', () => deleteDoacao(doacaoId));
}

function createDoacaoDetalhesModal() {
    const modalHtml = `
        <div class="modal fade" id="doacaoDetalhesModal" tabindex="-1" role="dialog" aria-labelledby="doacaoDetalhesModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="doacaoDetalhesModalLabel">Detalhes da Doação</h4>
                    </div>
                    <div class="modal-body">
                        <div id="doacaoDetalhesContent"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button id="deleteDoacaoBtn" class="btn btn-danger"><i class="fa fa-trash-o"></i> Eliminar Doação</button>
                        <button id="printDeclBtn" class="btn btn-default"><i class="fa fa-file-o"></i> Gerar Declaração</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('printDeclBtn').addEventListener('click', printDeclaracao);
}

async function fetchDoacaoDetalhes(doacaoId) {
    try {
        const response = await fetch(`http://localhost:3000/api/doacoes/${doacaoId}`);
        if (!response.ok) throw new Error('Erro ao buscar detalhes da doação');
        const doacao = await response.json();
        await populateDoacaoDetalhes(doacao);
    } catch (error) {
        console.error('Erro ao buscar detalhes da doação:', error);
        swal("Erro", "Ocorreu um erro ao buscar os detalhes da doação.", "error");
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

async function populateDoacaoDetalhes(doacao) {
    const contentDiv = document.getElementById('doacaoDetalhesContent');
    const beneficiario = await fetchBeneficiario(doacao.ClienteID);
    const produto = await fetchProdutoData(doacao.ProdutoID);
    
    contentDiv.innerHTML = `
        <p><strong>ID:</strong> #${doacao.ID}</p>
        <p><strong>Produto:</strong> ${produto.Nome}</p>
        <p><strong>Cliente:</strong> ${beneficiario.nome}</p>
        <p><strong>Quantidade:</strong> ${doacao.Quantidade}</p>
        <p><strong>Data da Doação:</strong> ${new Date(doacao.DataDoacao).toLocaleDateString()}</p>
    `;

    // Armazena dados do beneficiário e produto para uso na geração do PDF
    contentDiv.dataset.beneficiarioNome = beneficiario.nome;
    contentDiv.dataset.beneficiarioMorada = beneficiario.morada;
    contentDiv.dataset.beneficiarioTelemovel = beneficiario.telemovel;
    contentDiv.dataset.produtoNome = produto.Nome;

    contentDiv.dataset.nomeficheiro = doacao.ID + beneficiario.id + produto.ID;
}

function printDeclaracao() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Carregar a imagem do logotipo
    const imgData = 'img/logo.jpg'; // Caminho para a imagem do logotipo

    // Adicionar o logotipo ao PDF
    doc.addImage(imgData, 'JPEG', 20, 15, 55, 20);

    // Adicionar título ao lado do logotipo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DECLARAÇÃO DONATIVO DE PRODUTOS APOIO', 85, 37);

    // Adicionar a linha horizontal abaixo do logotipo e título
    doc.setLineWidth(0.3);
    doc.line(20, 40, 190, 40);

    // Coletar dados do modal
    const doacaoDetalhes = document.getElementById('doacaoDetalhesContent');
    const id = doacaoDetalhes.querySelector('p:nth-child(1)').textContent.split(': ')[1];
    const produto = doacaoDetalhes.dataset.produtoNome;
    const cliente = doacaoDetalhes.dataset.beneficiarioNome;
    const morada = doacaoDetalhes.dataset.beneficiarioMorada;
    const telemovel = doacaoDetalhes.dataset.beneficiarioTelemovel;
    const nomeficheiro = doacaoDetalhes.dataset.nomeficheiro;
    const quantidade = doacaoDetalhes.querySelector('p:nth-child(4)').textContent.split(': ')[1];
    const dataDoacao = doacaoDetalhes.querySelector('p:nth-child(5)').textContent.split(': ')[1];

    // Adicionar conteúdo ao PDF com quebra de linha para textos longos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nome do Beneficiário: ${cliente}`, 35, 65);
    doc.text(`Residente em: ${morada}`, 35, 72);
    doc.text(`Contato: ${telemovel}`, 35, 79);

    const textMaterial = 'Declaro que doei o seguinte material (Produtos de Apoio) à Associação de Paralisia Cerebral de Viana do Castelo:';
    doc.text(textMaterial, 35, 86, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.text(`Produto de Apoio: ${produto}`, 35, 100);
    doc.text(`Quantidade doada: ${quantidade}`, 35, 107);
    doc.text(`Data da Doação: ${dataDoacao}`, 35, 167);

    doc.setFont('helvetica', 'bold');
    const textDisclaimer = 'Declaro que tomei conhecimento de que este donativo entregue, será utilizado pela APCVC para empréstimo e/ou doação.';
    doc.text(textDisclaimer, 35, 180, { maxWidth: 150, lineHeightFactor: 1.6 });

    doc.setFont('helvetica', 'normal');
    doc.text('O/A declarante: _______________________________________________', 35, 207);

    // Adicionar a linha horizontal acima do rodape
    doc.setLineWidth(0.3);
    doc.line(35, 270, 175, 270);

    // Adicionar conteúdo ao rodapé
    doc.setFontSize(8);
    doc.text('Mod.PAF.19/0', 35, 275);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('Contribuinte N. 516 121 332 | Rua 25 de Abril, nº. 9 |  4925-010 Santa Marta de Portuzelo | VIANA DO CASTELO', 105, 280, { align: 'center' });
    doc.text('Telefone: 258 839 050 | E-mail: geral@apcvc.pt', 105, 285, { align: 'center' });

    doc.save(`Declaracao_Donativo_${nomeficheiro}.pdf`);
}

async function deleteDoacao(doacaoId) {
    try {
        const response = await fetch(`http://localhost:3000/api/doacoes/${doacaoId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erro ao deletar doação');
        
        await enviarNotificacao('Eliminado', `Eliminou a doação com ID: ${doacaoId}`);
        
        swal("Sucesso", "Doação deletada com sucesso!", "success");
        $('#doacaoDetalhesModal').modal('hide');
        
        // Atualize a lista de doações ou redirecione conforme necessário
        window.location.reload();
    } catch (error) {
        console.error('Erro ao deletar doação:', error);
        swal("Erro", "Ocorreu um erro ao deletar a doação.", "error");
    }
}
