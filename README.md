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
  - [x] Paginação de deals
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
  - [x] Paginação de deals
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

---

## Rotas do Back-end

Aqui estão as rotas disponíveis no back-end para o gerenciamento de deals, com detalhes sobre seus parâmetros, respostas e funcionalidades:

### Listar deals paginadas
**Rota:** `GET /deals?page={page}&size={size}`  
**Descrição:** Retorna uma lista de deals com paginação.  

**Parâmetros de consulta (query):**  
- `page`: Número da página (padrão: 1).  
- `size`: Quantidade de itens por página (padrão: 12).  

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "data": {
    "items": [...],
    "totalItems": 100,
    "page": 1,
    "pageSize": 20
  }
}
```

&nbsp;

### Listar deals paginadas pelo nome
**Rota:** `GET /deals/names/{nome}?page={page}&size={size}`  
**Descrição:** Retorna uma lista de deals com paginação.  

**Parâmetros de consulta (query):**
- `nome`: Nome ou parte do nome para filtrar os resultados.
- `page`: Número da página (padrão: 1).  
- `size`: Quantidade de itens por página (padrão: 12).  

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "data": {
    "items": [...],
    "totalItems": 100,
    "page": 1,
    "pageSize": 20
  }
}
```

&nbsp;

### Listar informações de um deal
**Rota:** `GET /deals/{id}`  
**Descrição:** Retorna as informações de um deal pelo ID.  

**Parâmetros de consulta (query):**
- `id`: ID do deal a ser visualizado.  

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "data": {
    ...
  }
}
```

&nbsp;

### Editar informações de um deal
**Rota:** `PATCH /deals/{id}`  
**Descrição:** Edita as informações de um deal pelo ID.  

**Parâmetros de consulta (query):**
- `id`: ID do deal a ser editado.  

**Exemplo de body da requisição:**
> Os campos são opcionais, é possível enviar a requisição apenas com um, dois ou todos os fields
```json
{
  "name": "Casa Legal",
  "description": "Descrição da Casa Legal",
  "score": 5,
  "isExhausted": true
}
```

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "message": "Deal updated successfully"
}
```

&nbsp;

### Cadastrar  um deal
**Rota:** `POST /deals`  
**Descrição:** Cadastra um novo deal.  

**Exemplo de body da requisição:**
```json
{
  "name": "Casa Legal",
  "description": "Descrição da Casa Legal",
  "score": 5,
  "isExhausted": true
}
```

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "message": "Deal created successfully"
}
```

&nbsp;

### Excluir um deal
**Rota:** `DELETE /deals/{id}`  
**Descrição:** Exclui um deal pelo ID.  

**Parâmetros de consulta (query):**
- `id`: ID do deal a ser excluido.  

**Exemplo de Resposta:**  
```json
{
  "success": true,
  "message": "Deal deleted successfully"
}
```

<!-- Badges -->
[badge-react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[badge-vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[badge-axios]: https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white
[badge-nestjs]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[badge-typeorm]: https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white
[badge-sqlite]: https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
