# Links App

Este é um aplicativo mobile desenvolvido com **React Native** e **Expo Router**. Ele permite armazenar, organizar e visualizar links úteis categorizados por tipo de conteúdo como artigos, vídeos, cursos, projetos, entre outros.

Com **autenticação integrada via Supabase API**, cada usuário tem seus próprios links sincronizados na nuvem, garantindo acesso seguro e backup automático dos dados.

## ✨ Funcionalidades

### 📚 Versão 1.0 (Curso Rocketseat)
- ✅ Adição de novos links com nome, URL e categoria  
- ✅ Armazenamento local usando `AsyncStorage` (não requer conexão com internet)  
- ✅ Filtros por categoria  
- ✅ Visualização rápida de links salvos  

### 🚀 Versão 2.0 (Desenvolvimento Próprio)
- 🆕 Sistema de autenticação completo (Login/Logout)
- 🆕 Integração com Supabase API REST
- 🆕 Login/Cadastro com Supabase  
- 🆕 Sistema de logout seguro
- 🆕 Persistência de dados na nuvem por usuário
- 🆕 Rotas protegidas (apenas usuários logados)
- 🆕 Persistência de sessão (mantém login após fechar app)

> **Evolução:** Projeto iniciado no minicurso da Rocketseat e expandido com funcionalidades próprias de autenticação e banco de dados.

## 🖼️ Preview
![Image](https://github.com/user-attachments/assets/8265e155-82eb-435d-9bc3-455e5965c472)

## 📱 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)  
- [Expo Router](https://expo.github.io/router/docs)  
- [TypeScript](https://www.typescriptlang.org/)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Supabase](https://supabase.com/) - Backend as a Service e API REST
- [Supabase Auth](https://supabase.com/auth) - Sistema de autenticação

## 🚀 Como rodar o projeto

```bash
# 1. Clone este repositório
git clone https://github.com/seu-usuario/nome-do-repo.git

# 2. Acesse a pasta do projeto
cd nome-do-repo

# 3. Instale as dependências
npm install
# ou
yarn

# 4. Inicie o projeto
npx expo start
