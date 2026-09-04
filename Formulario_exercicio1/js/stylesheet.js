/**
 * Aplica a estrutura e os estilos da atividade sem exigir classes no HTML.
 * O HTML precisa conter, nesta ordem lógica: logo do Trello, título, formulário
 * e as imagens da Atlassian, analytics e interactive.
 */
(() => {
  const STYLE_PATH = "./css/style.css";

  function carregarEstilos() {
    if (document.querySelector(`link[href="${STYLE_PATH}"]`)) {
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = STYLE_PATH;
    document.head.appendChild(stylesheet);
  }

  function criarElemento(tipo, classe) {
    const elemento = document.createElement(tipo);
    elemento.className = classe;
    return elemento;
  }

  function encontrarImagem(imagens, nomeDoArquivo) {
    return imagens.find((imagem) =>
      imagem.getAttribute("src")?.toLowerCase().includes(nomeDoArquivo),
    );
  }

  function montarInterface() {
    const { body } = document;

    if (body.dataset.trelloEstilizado) {
      return;
    }

    const imagens = [...body.querySelectorAll(":scope > img")];
    const logoTrello = encontrarImagem(imagens, "trello");
    const logoAtlassian = encontrarImagem(imagens, "atlassian");
    const imagemEsquerda = encontrarImagem(imagens, "analytics");
    const imagemDireita = encontrarImagem(imagens, "interactive");
    const titulo = body.querySelector(":scope > h1");
    const formulario = body.querySelector(":scope > form");

    if (
      !logoTrello ||
      !logoAtlassian ||
      !imagemEsquerda ||
      !imagemDireita ||
      !titulo ||
      !formulario
    ) {
      console.warn(
        "Não foi possível aplicar o layout: verifique as imagens, o título e o formulário da atividade.",
      );
      return;
    }

    const cabecalho = criarElemento("header", "trello-brand");
    const areaLogo = criarElemento("div", "trello-logo");
    areaLogo.appendChild(logoTrello);
    cabecalho.appendChild(areaLogo);

    const secao = criarElemento("section", "section-wrapper");
    const cartao = criarElemento("div", "account-form");
    titulo.classList.add("account-title");
    formulario.classList.add("account-form");

    const separador = formulario.querySelector("span");
    if (separador) {
      separador.classList.add("login-separator");
    }

    formulario
      .querySelectorAll('button[type="button"]')
      .forEach((botao) => botao.classList.add("oauth-button"));

    cartao.append(titulo, formulario);
    secao.appendChild(cartao);

    const rodape = criarElemento("footer", "global-footer");
    const areaAtlassian = criarElemento("div", "atlassian-logo");
    const planoDeFundo = criarElemento("div", "background");
    imagemEsquerda.classList.add("left-large");
    imagemDireita.classList.add("right-large");

    areaAtlassian.appendChild(logoAtlassian);
    planoDeFundo.append(imagemEsquerda, imagemDireita);
    rodape.append(areaAtlassian, planoDeFundo);

    body.append(cabecalho, secao, rodape);
    body.dataset.trelloEstilizado = "true";
  }

  carregarEstilos();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarInterface, { once: true });
  } else {
    montarInterface();
  }
})();
