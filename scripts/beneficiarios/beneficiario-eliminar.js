import { enviarNotificacao } from '../acoes/enviar-notificacao.js'; // Importar a função de enviar notificação

// Função para confirmar a exclusão
export async function confirmDelete() {
  return new Promise((resolve) => {
    swal({
      title: "Tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false, // Alterar para false para permitir uma ação após a confirmação
      closeOnCancel: true
    }, function(isConfirm) {
      resolve(isConfirm);
    });
  });
}

// Função para excluir um beneficiário
export async function deleteBeneficiary(beneficiarioId, beneficiarioName) {
  try {
    const response = await fetch(`http://localhost:3000/api/clientes/${beneficiarioId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Falha ao excluir o beneficiário com ID: ${beneficiarioId}`);
    }
    await enviarNotificacao('Eliminado', `Eliminou o beneficiário: ${beneficiarioName}`);
    swal("Eliminado!", "O beneficiário foi excluído com sucesso.", "success");
  } catch (error) {
    console.error('Error:', error);
    swal("Erro", "Ocorreu um erro ao excluir o beneficiário.", "error");
  }
}
