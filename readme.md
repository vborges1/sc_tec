# MICROSERVICE - EMPREENDIMENTOS

> Microserviço desenvolvido para gerenciamento de empreendimentos, permitindo cadastro, listagem, busca, edição e remoção. Implementado com Node.js, Express, TypeScript e SQLite.

---

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- SQLite
- better-sqlite3

---

## Funcionalidades

O sistema permite:

- Cadastrar novos empreendimentos  
- Listar todos os registros  
- Buscar empreendimento por ID  
- Atualizar dados de um empreendimento  
- Remover um empreendimento  

---

## Estrutura do Projeto

src/
├─ infra/
│ ├─ database/
│ │ ├─ sqlite.ts
│ │ └─ migrations.ts
│ └─ router/
│ ├─ index.ts
│ └─ empreendimentos.routes.ts
├─ models/
│ └─ empreendimento.ts
├─ repositories/
│ └─ empreendimentos.repository.ts
├─ log/
│ └─ startup-banner.ts
├─ server.ts
└─ app.ts

package.json
tsconfig.json

- **Routes** → Camada HTTP, define endpoints da API  
- **Repository** → Camada de acesso ao banco de dados  
- **Model** → Tipagem de dados com TypeScript  
- **Infra** → Configurações de banco e roteamento  

---

## Executando o projeto

Instale as dependências e execute no modo desenvolvimento
```
    npm install
    npm run dev
```

---

## Padrão de Resposta da API

Sucesso
```
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {}
}
```

Erro:
```
{
  "success": false,
  "message": "Descrição do erro"
}
```

## Arquitetura

Routes → Camada HTTP, define endpoints da API
Repository → Camada de acesso ao banco de dados
Model → Tipagem de dados com TypeScript
Infra → Configurações de banco e roteamento

---

## Vídeo Pitch

Assista ao vídeo pitch da aplicação aqui: [Link para o vídeo](COLE_AQUI_O_LINK_DO_VIDEO)