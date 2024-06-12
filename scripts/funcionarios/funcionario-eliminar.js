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
      closeOnConfirm: false,
      closeOnCancel: true
    }, function(isConfirm) {
      resolve(isConfirm);
    });
  });
}

// Função para excluir um funcionário
export async function deleteFuncionario(funcionarioId, funcionarioNome) {
  try {
    const response = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Falha ao excluir o funcionário com ID: ${funcionarioId}`);
    }
    await enviarNotificacao('Eliminado', `Eliminou o funcionário: ${funcionarioNome}`);
    swal("Eliminado!", "O funcionário foi excluído com sucesso.", "success");
  } catch (error) {
    console.error('Error:', error);
    swal("Erro", "Ocorreu um erro ao excluir o funcionário.", "error");
  }
}
