const catalogoF1 = [
  {
    nome: "Jogo de Pneus Soft (C5)",
    descricao: "Máxima aderência para volta rápida de classificação",
    custo: "US$ 45.000"
  },
  {
    nome: "Asa Dianteira High-Downforce",
    descricao: "Pacote aerodinâmico para circuitos travados e curvas de baixa",
    custo: "US$ 180.000"
  },
  {
    nome: "Assoalho Efeito Solo Spec-B",
    descricao: "Gera maior pressão aerodinâmica sem aumentar o arrasto em reta",
    custo: "US$ 320.000"
  },
  {
    nome: "Discos de Freio em Carbono",
    descricao: "Frenagens tardias acima de 330 km/h com dissipação extrema",
    custo: "US$ 95.000"
  }
];

const containerPecas = document.getElementById("lista-pecas");
const selectPeca = document.getElementById("peca-escolhida");


for (let i = 0; i < catalogoF1.length; i++) {
  const item = catalogoF1[i];

  const card = document.createElement("div");
  card.className = "card-produto";
  card.innerHTML = `
    <div>
      <h3>${item.nome}</h3>
      <p>${item.descricao}</p>
    </div>
    <span class="preco">Teto Orçamentário: ${item.custo}</span>
  `;
  containerPecas.appendChild(card);

  const option = document.createElement("option");
  option.value = item.nome;
  option.textContent = `${item.nome} (${item.custo})`;
  selectPeca.appendChild(option);
}


const btnBandeira = document.getElementById("btn-bandeira");
const badgeStatus = document.getElementById("badge-status");
let bandeiraVermelha = false;

btnBandeira.addEventListener("click", function () {
  if (bandeiraVermelha === false) {
    bandeiraVermelha = true;
    badgeStatus.textContent = "● Sessão Interrompida (Bandeira Vermelha)";
    badgeStatus.className = "status fechado";
    document.body.classList.add("bandeira-vermelha");
  } else {
    bandeiraVermelha = false;
    badgeStatus.textContent = "● Pit Lane Aberto (Bandeira Verde)";
    badgeStatus.className = "status aberto";
    document.body.classList.remove("bandeira-vermelha");
  }
});


const formBox = document.getElementById("form-box");
const msgValidacao = document.getElementById("mensagem-validacao");
const caixaUltimaOrdem = document.getElementById("caixa-ultima-ordem");

function carregarUltimaOrdem() {
  const ordemSalva = localStorage.getItem("ultimaOrdemF1");
  if (ordemSalva) {
    const dados = JSON.parse(ordemSalva);
    caixaUltimaOrdem.innerHTML = `
      <strong>Responsável:</strong> ${dados.engenheiro} | 
      <strong>Carro:</strong> ${dados.carro} <br>
      <strong>Solicitação:</strong> ${dados.quantidade}x ${dados.peca}
    `;
  }
}

carregarUltimaOrdem();

formBox.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const engenheiro = document.getElementById("engenheiro").value.trim();
  const carro = document.getElementById("carro").value.trim();
  const peca = selectPeca.value;
  const qtdTexto = document.getElementById("quantidade").value.trim();
  const qtdNumero = Number(qtdTexto);


  if (engenheiro === "" || carro === "") {
    msgValidacao.className = "msg-erro";
    msgValidacao.textContent = "Erro: Preencha o nome do responsável e o carro antes de enviar";
    return;
  }

  if (qtdTexto === "" || isNaN(qtdNumero) || qtdNumero <= 0) {
    msgValidacao.className = "msg-erro";
    msgValidacao.textContent = "Erro: Digite uma quantidade numérica válida maior que zero";
    return;
  }

  
  const novaOrdem = {
    engenheiro: engenheiro,
    carro: carro,
    peca: peca,
    quantidade: qtdNumero
  };

  localStorage.setItem("ultimaOrdemF1", JSON.stringify(novaOrdem));

  msgValidacao.className = "msg-erro msg-sucesso";
  msgValidacao.textContent = "Ordem enviada ao box e salva no navegador!";

  carregarUltimaOrdem();
  formBox.reset();
});