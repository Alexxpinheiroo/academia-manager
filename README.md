# Corpus Academia Manager 🏋️‍♂️

Sistema de controle de acesso e gerenciamento de perfil de usuários desenvolvido como projeto prático para o curso de Análise e Desenvolvimento de Sistemas (ADS). A aplicação utiliza uma arquitetura baseada em React e integra serviços em nuvem do Firebase para autenticação segura e persistência de dados.

## 🚀 Funcionalidades

* **Autenticação de Usuários:** Fluxo completo de criação de contas e validação de credenciais (E-mail/Senha) via *Firebase Authentication*.
* **Persistência no Banco de Dados:** Armazenamento e recuperação em tempo real de dados complementares do perfil do usuário (Nome, Sobrenome e Data de Nascimento) utilizando o banco de dados NoSQL *Cloud Firestore*.
* **Rotas Protegidas:** Controle de navegação dinâmico via *React Router DOM*, impedindo o acesso à área restrita da aplicação por usuários não autenticados.
* **Design Otimizado:** Interface responsiva e limpa, desenvolvida para garantir usabilidade tanto em navegadores desktop quanto em dispositivos móveis.
* **Hospedagem em Produção:** Configuração de redirecionamento integrada para garantir a estabilidade das rotas de Single Page Application (SPA) no ambiente da *Vercel*.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React (Vite), HTML5, CSS3
* **Gerenciamento de Rotas:** React Router DOM
* **Backend as a Service (BaaS):** Firebase (Authentication & Cloud Firestore)
* **Hospedagem:** Vercel

## 📂 Estrutura do Projeto

```text
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens e recursos visuais
│   ├── config/          # Configuração e inicialização do Firebase
│   ├── pages/           # Telas da aplicação (Cadastro, Login, Principal)
│   ├── routes/          # Gerenciamento de rotas públicas e protegidas
│   ├── App.jsx          # Componente raiz
│   └── main.jsx         # Ponto de entrada do React
├── vercel.json          # Configuração de rewrites para a Vercel
├── package.json         # Dependências e scripts do projeto
└── vite.config.js       # Configuração do build do Vite
