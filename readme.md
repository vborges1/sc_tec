## MICROSERVICE - EMPREENDIMENTOS

> Microserviço de gerenciamento de empreendimentos imobiliários, desenvolvido como parte do Desafio Prático de Software do processo seletivo da trilha de IA para DEVs do SC Téc. Implementa o ciclo completo de CRUD via API, com foco em performance e tipagem forte, utilizando Node.js, Express, TypeScript e SQLite.

---

### Tecnologias Utilizadas

- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **Banco de Dados:** SQLite (`better-sqlite3`)
- **Utilitários:** Dotenv, CORS

---

### Funcionalidades

O sistema permite a gestão completa dos dados:

- **Cadastrar** novos empreendimentos
- **Listar** todos os registros armazenados
- **Buscar** um empreendimento específico por ID
- **Atualizar** dados de um empreendimento existente
- **Remover** registros do banco de dados

---

### Estrutura do Projeto

A organização segue padrões de clean code e separação de responsabilidades:

```text
src/
├── infra/
│   ├── bootstrap/
│   │   └── bootstrap.ts
│   ├── database/
│   │   ├── migrations.ts
│   │   ├── schema.sql
│   │   └── sqlite.ts
│   ├── errors/
│   │   ├── error.ts
│   ├── log/
│   │   └── startup-banner.ts
│   ├── repositories/
│   │   └── empreendimentos.repository.ts
│   ├── router/
│   │   ├── empreendimentos.routes.ts
│   │   └── index.ts
│   └── validations/
│       └── empreendimentos.validation.ts
├── json/
│   └── dados.json
├── models/
│   └── empreendimento.ts
├── app.ts
├── cors-config.ts
└── server.ts
```

---

### Executando o Projeto

Para rodar o microserviço localmente, siga os passos abaixo:

1. **Instale as dependências:**
```bash
npm install
```


2. **Configure o ambiente:**
* Verifique o arquivo `.env.example` e crie o seu `.env`.


3. **Inicie o servidor em modo de desenvolvimento:**
```bash
npm run dev
```



---

### Padrão de Resposta da API

A API utiliza um formato padronizado para todas as requisições:

**Sucesso:**

```json
{
  "success": true,
  "message": "Descriçãp da operação bem sucedida"
}
```

**Erro:**

```json
{
  "success": false,
  "error": "Descrição detalhada do erro ocorrido"
}
```

---

## Vídeo Pitch

Assista à apresentação da aplicação e suas funcionalidades:
👉 [Link para o vídeo](https://youtu.be/-SnBqjtpsWw)
