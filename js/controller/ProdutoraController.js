import produtoraView from "../view/ProdutoraView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarProdutoraFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = produtoraView.renderizarFormulario();
  document.getElementById("formulario_tarefa").addEventListener("submit", cadastrarProdutora);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarProdutora(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("produtora_nome_formulario").value;
  const enderecoValor = document.getElementById("produtora_endereco_formulario").value;
  const novaProdutora = { nome: nomeValor, endereco: enderecoValor };

  try {
    await fetch(`${API_BASE_URL}/produtora`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaProdutora),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Produtora:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaProdutora(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/produtora");
    const produtoraBD = await response.json(); 

    const produtora = produtoraBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        endereco: row.endereco,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = produtoraView.renderizarTabela(produtora);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar Produtoras:", error);
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
      const produtoraId = this.getAttribute("produtora-id");
      excluirTarefa(produtoraId);
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
      const produtoraId = this.getAttribute("produtora-atualizar-id");
      buscarProdutora(produtoraId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/produtora/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a Produtora.");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Produtora:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarProdutora(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`);
    const produtoraBD = await response.json();
    if (produtoraBD.length <= 0) return;

    const produtora = produtoraBD.map(row => ({
      id: row.id,
      nome: row.nome,
      endereco: row.endereco,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = tarefaView.renderizarFormularioAtualizar(produtora);
    document.getElementById("formulario_produtora_atualizar").addEventListener("submit", atualizarProdutora);
  } catch (error) {
    console.error("Erro ao buscar Produtora:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarProdutora(event) {
  event.preventDefault();

  const idValor = document.getElementById("produtora_id_formulario").value;
  const nomeValor = document.getElementById("produtora_nome_formulario").value;
  const enderecoValor = document.getElementById("produtora_endereco_formulario").value;
  const produtora = {id: idValor, nome: nomeValor, endereco: enderecoValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/produtora`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(produtora),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a Produtora.");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaProdutora(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Produtora:", error);
  }
}

const TarefaController = {
  renderizarProdutoraFormulario,
  cadastrarProdutora,
  renderizarListaProdutora,
  excluirProdutora,
};

export default ProdutoraController;
