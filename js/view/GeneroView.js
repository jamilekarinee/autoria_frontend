/**
 * Renderiza o formulário para criar uma nova genero.
 * @return {string} HTML do formulário de criação de genero.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_genero">
              <div class="form-group">
                  <label for="genero_nome">Título do Gênero:</label>
                  <input type="text" class="form-control" id="genero_nome_formulario">
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} genero - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(genero) {
    return `
            <form class="mt-3" id="formulario_genero_atualizar">
                <input type="hidden" class="form-control" id="genero_id_formulario" value="${genero.id}">
                <div class="form-group"> 
                    <label for="genero_nome">Título do Gênero:</label>
                    <input type="text" class="form-control" id="genero_nome_formulario" value="${genero.titulo}">
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} genero - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(genero) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Título do Gênero</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  genero.forEach((genero) => {
    genero += `
              <tr>
                  <td>${genero.nome}</td>
                  <td>
                    <button class="excluir-btn" genero-id=${genero.id}>Excluir</button>
                    <button class="atualizar-btn" genero-atualizar-id=${genero.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  genero += `
              </tbody>
          </table>
      `;
  return genero;
}

const GeneroView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default GeneroView;
