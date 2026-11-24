# Apex F1 Garage

Página web temática de Fórmula 1 para visualizar componentes e pneus de corrida e registrar solicitações de upgrades para o box. O projeto foi desenvolvido com HTML, CSS e JavaScript.

## Funcionalidades

- Catálogo de componentes e compostos de pneus, exibido dinamicamente na página.
- Alternância entre os estados de **Bandeira Verde** (Pit Lane aberto) e **Bandeira Vermelha** (sessão interrompida), com atualização visual da interface.
- Formulário para solicitar um componente, informando responsável, carro ou chassi e quantidade.
- Validação dos campos obrigatórios e da quantidade informada.
- Exibição da última ordem registrada, salva no `localStorage` do navegador.
- Layout responsivo com tema escuro e identidade visual inspirada no automobilismo.

## Tecnologias

- **HTML5** — estrutura e conteúdo da página.
- **CSS3** — estilos, layout e estados visuais.
- **JavaScript** — catálogo dinâmico, interação, validação do formulário e armazenamento local.

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/Amaroxnz/minha-pagina.git
   ```

2. Abra a pasta do projeto:

   ```bash
   cd minha-pagina
   ```

3. Abra o arquivo `index.html` em um navegador moderno. Não é necessário instalar dependências ou iniciar um servidor.

## Como usar

1. Consulte os componentes e pneus disponíveis no catálogo.
2. Use **Alternar Bandeira** para alternar entre bandeira verde e vermelha.
3. Preencha o formulário com o responsável, o carro ou chassi, o item e a quantidade desejada.
4. Clique em **Enviar Ordem ao Box**. A última ordem ficará visível na página e será salva no navegador.

## Estrutura do projeto

```text
minha-pagina/
├── index.html    # Estrutura da página
├── estilo.css    # Estilos e layout
├── script.js     # Catálogo, interações e lógica do formulário
└── README.md     # Documentação do projeto
```

## Armazenamento

A última ordem é guardada no `localStorage` do navegador. Ela permanece disponível nesse mesmo navegador até que os dados locais sejam removidos ou substituídos por uma nova solicitação.

## Autor

Desenvolvido por [Matheus Amaro](https://github.com/Amaroxnz).
