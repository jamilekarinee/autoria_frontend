/**
 * Renderiza o formulário para criar uma nova produtora.
 * @return {string} HTML do formulário de criação de produtora.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_produtora">
              <div class="form-group">
                  <label for="produtora_nome">Título da Produtora:</label>
                  <input type="text" class="form-control" id="produtora_nome_formulario">
              </div>
              <div class="form-group">
                  <label for="produtora_endereco">Descrição:</label>
                  <textarea class="form-control" id="produtora_endereco_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma produtora existente.
 * @param {Object} produtora - A produtora a ser atualizada.
 * @return {string} HTML do formulário de atualização de produtora.
 */
function renderizarFormularioAtualizar(produtora) {
    return `
            <form class="mt-3" id="formulario_produtora_atualizar">
                <input type="hidden" class="form-control" id="produtora_id_formulario" value="${produtora.id}">
                <div class="form-group">
                    <label for="produtora_nome">Título da Produtora:</label>
                    <input type="text" class="form-control" id="produtora_nome_formulario" value="${produtora.nome}">
                </div>
                <div class="form-group">
                    <label for="produtora_endereco">Descrição:</label>
                    <textarea class="form-control" id="produtora_endereco_formulario">${produtora.endereco}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} produtora - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarProdutora(produtora) {
  let produtora = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Título da Produtora</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  tarefas.forEach((produtora) => {
    produtora += `
              <tr>
                  <td>${produtora.nome}</td>
                  <td>${produtora.endereco}</td>
                  <td>
                    <button class="excluir-btn" tarefa-id=${produtora.id}>Excluir</button>
                    <button class="atualizar-btn" tarefa-atualizar-id=${produtora.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  produtora += `
              </tbody>
          </table>
      `;

  return produtora;
}

const ProdutoraView = {
    renderizarFormulario,
    renderizarProdutora,
    renderizarFormularioAtualizar
};

export default ProdutoraView;
