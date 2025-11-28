# 📚 BookLink

O **BookLink** é um aplicativo voltado para leitores que desejam organizar sua biblioteca digital, compartilhar opiniões e interagir com outros apaixonados por livros.  
Ele funciona integrado a uma **API backend em Node.js** e a um **banco de dados MySQL**, garantindo operações de CRUD em tempo real.

---

## 🚀 Funcionalidades

- **Cadastro de usuários**: criar conta com nome, email, senha e avatar.  
- **Login de usuários**: autenticação simples para acesso ao perfil.  
- **Gerenciamento de livros**:
  - Listar livros cadastrados.
  - Adicionar novos livros com título, autor, descrição e capa.
  - Atualizar status de leitura (lendo, lido, quero ler).
  - Excluir livros da biblioteca.  
- **Interações sociais**:
  - Curtidas e comentários em livros.
  - Perfis de usuários com informações personalizadas.  
- **Navegação entre telas**: sistema de navegação stack para acessar lista, cadastro, perfil e detalhes.  
- **Integração com API**: consumo dos endpoints do backend para operações em tempo real.

---

## 🛠️ Tecnologias utilizadas

### Frontend
- **React Native** (Expo)
- **React Navigation** (stack navigation)
- **AsyncStorage** (persistência simples de dados)

### Backend
- **Node.js** com **Express**
- **Sequelize** (ORM)
- **MySQL** (banco de dados relacional)

---

## ⚙️ Como rodar o projeto

### Backend
```bash
cd backend
npm install
npm run backend
```

### Frontend
```bash
cd frontend
npm install
npm start
```

