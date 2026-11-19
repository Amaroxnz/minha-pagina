// =========================================================
// DEGRAU COMPLETO (Parte 1): Array de objetos + Laço
// =========================================================
const catalogo = [
  {
    nome: "Bandeja de Tofu Artesanal",
    descricao: "Feito às 03:00 da manhã. Entrega rápida sem derramar água do copo.",
    preco: 25.00
  },
  {
    nome: "Acerto de Suspensão Touge",
    descricao: "Alinhamento e cambagem focados em curvas fechadas de serra.",
    preco: 350.00
  },
  {
    nome: "Kit Swap Mini-Me VTEC",
    descricao: "Preparação de cabeçote D16Y8 para máxima resposta em alta rotação.",
    preco: 1450.00
  },
  {
    nome: "Pastilhas de Freio Cerâmica",
    descricao: "Resistência térmica para descidas intensas sem fading.",
    preco: 290.00
  }
];

const containerProdutos = document.getElementById("lista-produtos");
const selectItem = document.getElementById("item-escolhido");

// Laço percorrendo o array para montar os cards e o <select>
for (let i = 0; i < catalogo.length; i++) {
  const item = catalogo[i];

  // Cria o card na vitrine
  const card = document.createElement("div");
  card.className = "card-produto";
  card.innerHTML = `
    <div>
      <h3>${item.nome}</h3>
      <p>${item.descricao}</p>
    </div>
    <span class="preco">R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
  `;
  containerProdutos.appendChild(card);

  // Adiciona também como opção no formulário
  const option = document.createElement("option");
  option.value = item.nome;
  option.textContent = `${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`;
  selectItem.appendChild(option);
}

// =========================================================
// DEGRAU MÍNIMO: Botão que altera a página com if/else
// =========================================================
const btnTurno = document.getElementById("btn-turno");
const badgeStatus = document.getElementById("badge-status");
let emEntregaNoturna = false;

btnTurno.addEventListener("click", function () {
  if (emEntregaNoturna === false) {
    emEntregaNoturna = true;
    badgeStatus.textContent = "● Em Entrega na Serra de Akina (04:00 AM)";
    badgeStatus.className = "status serra";
    document.body.classList.add("modo-touge");
  } else {
    emEntregaNoturna = false;
    badgeStatus.textContent = "● Loja Aberta (Atendimento Normal)";
    badgeStatus.className = "status aberto";
    document.body.classList.remove("modo-touge");
  }
});

// =========================================================
// DEGRAU INTERMEDIÁRIO: Validação de campos do formulário
// + DEGRAU COMPLETO (Parte 2): Salvando no localStorage
// =========================================================
const formPedido = document.getElementById("form-pedido");
const msgValidacao = document.getElementById("mensagem-validacao");
const caixaUltimoPedido = document.getElementById("caixa-ultimo-pedido");

// Função para exibir o que está salvo no localStorage ao abrir/recarregar a página
function carregarUltimoPedido() {
  const pedidoSalvo = localStorage.getItem("ultimoPedidoFujiwara");
  if (pedidoSalvo) {
    const dados = JSON.parse(pedidoSalvo);
    caixaUltimoPedido.innerHTML = `
      <strong>Cliente:</strong> ${dados.cliente} | 
      <strong>Carro:</strong> ${dados.carro} <br>
      <strong>Pedido:</strong> ${dados.quantidade}x ${dados.item}
    `;
  }
}

carregarUltimoPedido();

formPedido.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Evita recarregar a página ao enviar

  const cliente = document.getElementById("cliente").value.trim();
  const carro = document.getElementById("carro").value.trim();
  const item = selectItem.value;
  const qtdTexto = document.getElementById("quantidade").value.trim();
  const qtdNumero = Number(qtdTexto);

  // Validações
  if (cliente === "" || carro === "") {
    msgValidacao.className = "msg-erro";
    msgValidacao.textContent = "Erro: Preencha seu nome e o modelo do carro antes de confirmar.";
    return;
  }

  if (qtdTexto === "" || isNaN(qtdNumero) || qtdNumero <= 0) {
    msgValidacao.className = "msg-erro";
    msgValidacao.textContent = "Erro: Digite uma quantidade numérica válida maior que zero.";
    return;
  }

  // Se passou na validação, salva no localStorage
  const novoPedido = {
    cliente: cliente,
    carro: carro,
    item: item,
    quantidade: qtdNumero
  };

  localStorage.setItem("ultimoPedidoFujiwara", JSON.stringify(novoPedido));

  msgValidacao.className = "msg-erro msg-sucesso";
  msgValidacao.textContent = "Pedido registrado e salvo no navegador com sucesso!";

  carregarUltimoPedido();
  formPedido.reset();
});
