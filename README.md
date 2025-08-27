
---

# 📽️ Victus - Frontend

Frontend do sistema de biblioteca online de vídeos, desenvolvido em **Vue 3** com integração a uma API Laravel.
Permite autenticação de usuários, criação de bibliotecas, upload de vídeos e gerenciamento de perfis.

---

## 🚀 Tecnologias Utilizadas

* [Vue 3](https://vuejs.org/) (Composition API)
* [Vue Router](https://router.vuejs.org/)
* [Pinia](https://pinia.vuejs.org/) (Store Management)
* [Axios](https://axios-http.com/)
* [TailwindCSS](https://tailwindcss.com/) (Estilização)
* [Vue Toastification](https://github.com/Maronato/vue-toastification) (Notificações)
* [Heroicons](https://heroicons.com/) (Ícones SVG)
* [Vite](https://vitejs.dev/) (Build e Dev Server)

---

## 📂 Estrutura do Projeto

```
src/
 ├─ assets/              # Estilos globais
 ├─ components/          # Componentes reutilizáveis (Footer, Navigation, ModalAdd, etc.)
 ├─ router/              # Configuração de rotas
 ├─ services/            # Configuração de API e interceptors (auth.js)
 ├─ stores/              # Gerenciamento de autenticação (Pinia)
 ├─ views/               # Páginas principais (Login, Register, Dashboard, Libraries, etc.)
 ├─ api.js               # Cliente Axios para consumo da API
 ├─ main.js              # Arquivo de inicialização
```

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Pré-requisitos

* [Node.js](https://nodejs.org/) **20.x ou superior**
* NPM ou Yarn
* Backend Laravel rodando em `http://localhost:8000`

---

### 2️⃣ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/joasumbo/victus.git
cd video-app-frontend
npm install
```

---

### 3️⃣ Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
VITE_API_URL=http://localhost:8000/api
VITE_STORAGE_URL=http://localhost:8000/storage
```

> 🔑 Esses valores devem corresponder ao backend Laravel configurado anteriormente.

---

### 4️⃣ Executando o Projeto

Modo desenvolvimento:

```bash
npm run dev
```

Build para produção:

```bash
npm run build
```

Pré-visualização do build:

```bash
npm run preview
```

---

## 🔐 Autenticação

* Login e Registro utilizando a API Laravel (`/api/login`, `/api/register`)
* Tokens JWT armazenados em `localStorage`
* Interceptores Axios para adicionar o `Authorization: Bearer <token>` automaticamente
* Redirecionamento automático para `/login` em caso de `401 Unauthorized`

---

## 📖 Funcionalidades Principais

✅ Registro e login de usuários
✅ Persistência de sessão (Token + User no LocalStorage)
✅ Dashboard com visão geral
✅ Criar bibliotecas de vídeos
✅ Upload e listagem de vídeos em cada biblioteca
✅ Perfil de usuário
✅ Notificações de sucesso/erro com **Toastification**
✅ Proteção de rotas com `meta: { requiresAuth: true }`

---

## 🔗 Integração com Backend

Este frontend consome os endpoints da **API Laravel** configurada em:

```
/api/register
/api/login
/api/me
/api/libraries
/api/videos
```

O valor de `VITE_API_URL` define o endereço base.

---

## 👨‍💻 Desenvolvimento

Comandos úteis:

```bash
# Rodar servidor de dev
npm run dev

# Fazer build de produção
npm run build

# Testar build localmente
npm run preview
```

---

## 📝 Licença

Este projeto é de uso **privado** e foi desenvolvido para estudos e prática de integração **Vue 3 + Laravel API**.

---
