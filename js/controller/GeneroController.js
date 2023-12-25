import generoView from "../view/GeneroView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarGeneroFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = generoView.renderizarFormulario();
  document.getElementById("formulario_genero").addEventListener("submit", cadastrarGenero);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTarefa(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("genero_nome_formulario").value;
  const novaGenero = {nome: nomeValor};

  try {
    await fetch(`${API_BASE_URL}/genero`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaGenero),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaGenero(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Gênero:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaGenero(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/genero");
    const generoBD = await response.json(); 

    const genero = generoBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = generoView.renderizarTabela(genero);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar Gêneros:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const generoId = this.getAttribute("genero-id");
      excluirGenero(generoId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const generoId = this.getAttribute("genero-atualizar-id");
      buscarTarefa(generoId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirGenero(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/genero/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o Gênero.");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaGenero(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o Gênero:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarGener(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/genero/${id}`);
    const generoBD = await response.json();
    if (generoBD.length <= 0) return;

    const genero = generoBD.map(row => ({
      id: row.id,
      nome: row.nome,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = tarefaView.renderizarFormularioAtualizar(genero);
    document.getElementById("formulario_genero_atualizar").addEventListener("submit", atualizarGenero);
  } catch (error) {
    console.error("Erro ao buscar Gêneros:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarGenero(event) {
  event.preventDefault();

  const idValor = document.getElementById("genero_id_formulario").value;
  const nomeValor = document.getElementById("genero_titulo_formulario").value;
  const tarefa = {id: idValor, nome: nomeValor};

  try {
    const response = await fetch(`${API_BASE_URL}/genero`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(genero),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o Gênero.");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaGenero(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Gênero:", error);
  }
}

const GeneroController = {
  renderizarGeneroFormulario,
  cadastrarGenero,
  renderizarListaGenero,
  excluirGenero,
};

export default GeneroController;
