# Git Search

[comment]: <> (Demonstração online https://jhonatanferreira.me/git-search)

<kbd>
  <img src="https://raw.githubusercontent.com/jhonatanAlanFerreira/git-search/master/screenshots/screenshot1.png" alt="Screen Shot">
  <br>
</kbd>

> Uma página em React para consultar repositórios consumindo a API do Github.

### Ajustes e melhorias

* Para telas pequenas a largura essa fixa, a responsividade será melhorada.

## 💻 Pré-requisitos

Necessário ter Node.js e NPM instalados.
<br>https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## ☕ Usando Git Search
Execute `npm install` no terminal dentro da pasta do projeto onde fica o package.json para instalar as dependências do projeto, em seguida execute `npm start` para compilar. Será aberto uma página em http://localhost:3000.

## 🌟 Features 

* Os resultados são mostrados em formato cards com paginação de 10 itens por página. A API do Github apenas lista os 1000 primeiros resultados.

* Ao clicar em um card você é redirecionado ao repositório do Github referente ao card, existem outros links na página como o criador e a contagem de issues que também redirecionam ao Github.

* Os resultados podem ser ordenados selecionando um item da lista do lado esquerdo da página.
