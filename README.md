# 🧩 Product Management Frontend (Angular 17)

Este projeto é o **frontend do sistema Product Management**, desenvolvido em **Angular 17** com **Standalone Components** e arquitetura limpa. Ele permite **cadastrar, editar e excluir produtos**, consumindo a API .NET hospedada em outro container ou localmente.

---

## 🚀 Funcionalidades Principais

- ✅ Cadastro de novos produtos
- ✏️ Edição ao clicar em um item da tabela
- 🗑️ Exclusão direta de produtos
- 🔄 Atualização automática da lista
- 📱 Interface responsiva (Angular + SCSS)

---

## 📁 Estrutura do Projeto

```bash
product-management-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/products-api.service.ts   # Comunicação com a API
│   │   ├── features/
│   │   │   └── products/
│   │   │       ├── models/                       # Tipos de dados (Product)
│   │   │       ├── components/
│   │   │       │   ├── product-form/             # Formulário de criação/edição
│   │   │       │   └── products-table/           # Listagem de produtos
│   │   │       └── products-page/                # Página principal
│   │   └── app.routes.ts                         # Rotas da aplicação
│   ├── assets/
│   ├── styles.scss                               # Estilos globais
│   └── index.html                                # Ponto de entrada
├── package.json
├── angular.json
└── Dockerfile
```

---

## ⚙️ Pré-Requisitos

- [Node.js 20+](https://nodejs.org)
- [Angular CLI 17+](https://angular.dev)
- (opcional) Docker Desktop para buildar a imagem containerizada

---

## 🧠 Configuração da API

O serviço Angular consome a API .NET configurada no arquivo:

`src/app/core/services/products-api.service.ts`

```ts
private readonly baseUrl = 'http://localhost:5000/api/products';
```

Se sua API estiver rodando em outra porta (ex: 5000), altere para:

```ts
private readonly baseUrl = 'http://localhost:5000/api/products';
```

---

## 🖥️ Rodando Localmente

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm start
```

Abra o navegador em:
👉 **http://localhost:4200**

A aplicação recarrega automaticamente a cada alteração.

---

## 🐳 Rodando com Docker

Você pode buildar e rodar o frontend como container.

### 1️⃣ Build da imagem

```bash
docker build -t product-management-frontend .
```

### 2️⃣ Rodar o container

```bash
docker run -d -p 4200:80 product-management-frontend
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 🧩 Dockerfile (referência)

```Dockerfile
# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist

# Etapa de runtime
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📦 Build de Produção Manual

Se quiser gerar os artefatos localmente:

```bash
npm run build
```

O build será criado em `dist/`.

---

## 🧪 Testes Unitários

Executar testes (Jasmine + Karma):

```bash
npm test
```

---

## 💡 Boas Práticas Implementadas

- Angular 17 com **Standalone Components**
- **Reactive Forms** para validações
- **Services** para isolamento da lógica de API
- **Signals** para gerenciamento leve de estado
- **Clean UI** com SCSS modularizado

---

## 🧭 Fluxo de Uso

1. Usuário acessa `/`
2. Formulário permite criar novo produto
3. Lista mostra todos os produtos cadastrados
4. Clicar em um produto → preenche o formulário para edição
5. Salvar → atualiza produto existente
6. Deletar → remove da tabela e recarrega a lista

---

## 🏁 Conclusão

O **Product Management Frontend** é um painel Angular moderno, rápido e desacoplado da API, podendo ser facilmente integrado a qualquer backend RESTful. 

> 🧠 Para subir completo com a API, basta incluir este container no mesmo `docker-compose.yml` da solução backend.