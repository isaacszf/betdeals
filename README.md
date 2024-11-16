# Betdeals

Este projeto foi desenvolvido como parte de um desafio técnico 
para avaliação de habilidades em desenvolvimento de aplicações web. O objetivo foi criar uma aplicação para o gerenciamento de Deals 
no contexto do mercado de afiliações de iGaming, que representam acordos estabelecidos entre casas de apostas e afiliados.

A aplicação implementa funcionalidades básicas e essenciais, simulando cenários reais do dia a dia de um desenvolvedor, 
com foco em organização, eficiência e boas práticas de programação.

**Vídeo apresentando as funcionalidades:**

*TO-DO colocar anexo*

---
## Tecnologias Utilizadas ⚒️

### Front-end
![badge-react] ![badge-vite] ![badge-axios]

### Back-end
![badge-nestjs] ![badge-typeorm] ![badge-sqlite]

---
## CheckList 📋

### Front-end
- Requisitos Obrigatórios

  - [x] Interface que permita a visualização e criação de deals
  - [x] Pesquisa de deals pelo nome
  - [x] Interação, UX e Feedback ao usuário
    
- Requisitos Opcionais

  - [x] Interface de acordo com o Figma
  - [x] Interface que permita a edição e remoção de deals
  - [x] Tratamento de erros
  - [x] Páginação de deals
  - [x] Responsividade

### Back-end
- Requisitos Opcionais

  - [x] CRUD de deals
    - [x] Visualização geral
    - [x] Visualização geral por nome
    - [x] Visualização individual
    - [x] Edição
    - [x] Remoção
  - [x] Tratamento de erros
  - [x] Páginação de deals
  - [x] Testes para as operações do CRUD

---
## Executando o Projeto 🚀

Siga os passos abaixo para configurar e executar o projeto corretamente:

### 1. Clone o repositório e navegue até a pasta do projeto
Abra o terminal e execute os seguintes comandos:  
```bash
git clone https://github.com/isaacszf/betdeals.git
cd betdeals
```

### 2. Configure e inicie o back-end
O back-end precisa estar em execução para que o front-end funcione corretamente. Para iniciar o back-end, siga as etapas abaixo:
```bash
cd betpass-backend
npm install
npm run start:dev
```
> Nota: O servidor do back-end estará disponível em http://localhost:3000.

### 3. Configure e inicie o front-end
Abra um novo terminal, navegue até a pasta do front-end e inicie o projeto:
```bash
cd betpass-frontend
npm install
npm run dev
```
> Nota: A aplicação front-end estará disponível em http://localhost:5173.

Com estas instruções, você estará pronto para utilizar a aplicação de gerenciamento de Deals. 🚀

---

## Comandos Úteis 💡

### Rodar os testes
Para rodar os testes unitários utilize o comando abaixo no projeto de back-end (betpass-backend):
```bash
npm run test:e2e
```

### Rodar as migrations
Se necessário, utilize o comando abaixo no projeto de back-end (betpass-backend) para aplicar as migrations no banco SQLite:
```bash
npm run migration:run
```

<!-- Badges -->
[badge-react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[badge-vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[badge-axios]: https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white
[badge-nestjs]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[badge-typeorm]: https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white
[badge-sqlite]: https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
