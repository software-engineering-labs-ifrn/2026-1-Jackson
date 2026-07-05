# Diagrama de Classes

## Objetivo

O Diagrama de Classes representa a estrutura estática do backend do sistema **Meu Orçamento**, evidenciando as principais classes, seus atributos, métodos e relacionamentos. Este artefato serve como base para a implementação das funcionalidades descritas no Diagrama de Casos de Uso e nas User Stories do projeto.

## Arquitetura

O backend foi desenvolvido seguindo uma arquitetura em camadas, separando as responsabilidades da aplicação em quatro grupos principais:

- **Controllers:** recebem as requisições HTTP e encaminham as operações para a camada de serviços.
- **Services:** concentram as regras de negócio e realizam o acesso às entidades persistidas.
- **Entities:** representam as entidades do domínio e seu mapeamento para o banco de dados utilizando TypeORM.
- **DTO (Data Transfer Object):** define a estrutura dos dados utilizados para cadastro e atualização de transações.

## Classes Modeladas

### AuthController

Responsável pelas funcionalidades de autenticação do sistema.

**Métodos:**

- `register(req, res)`
- `login(req, res)`
- `getProfile(req, res)`

---

### TransactionController

Responsável pelo gerenciamento das transações financeiras.

**Métodos:**

- `create(req, res)`
- `getAll(req, res)`
- `update(req, res)`
- `delete(req, res)`

---

### UserService

Implementa as regras de negócio relacionadas aos usuários.

**Métodos:**

- `createUser(data)`
- `findUserByEmail(email)`
- `findUserById(id)`

---

### TransactionService

Implementa as regras de negócio relacionadas às transações financeiras.

**Métodos:**

- `createTransaction(data, userId)`
- `getTransactionsByUser(userId)`
- `updateTransaction(transactionId, userId, data)`
- `deleteTransaction(transactionId, userId)`

---

### User

Representa o usuário do sistema.

**Atributos:**

- `id`
- `name`
- `email`
- `password`
- `transactions`
- `createdAt`

---

### Transaction

Representa uma transação financeira cadastrada pelo usuário.

**Atributos:**

- `id`
- `description`
- `amount`
- `type`
- `category`
- `date`
- `user`
- `createdAt`

---

### TransactionDTO

Interface utilizada para transferência de dados entre o Controller e o Service durante o cadastro e atualização de transações.

**Campos:**

- `description`
- `amount`
- `type`
- `category`
- `date`

## Relacionamentos

O diagrama apresenta os seguintes relacionamentos:

- `AuthController` utiliza `UserService`.
- `TransactionController` utiliza `TransactionService`.
- `UserService` manipula a entidade `User`.
- `TransactionService` manipula as entidades `User` e `Transaction`.
- `TransactionService` utiliza `TransactionDTO`.
- Um **User** pode possuir **várias Transaction**, enquanto cada **Transaction** pertence a apenas um **User** (relação 1:N).

## Atendimento aos Casos de Uso

O diagrama de classes permite implementar todas as funcionalidades modeladas no Diagrama de Casos de Uso:

- Cadastro de conta;
- Login;
- Visualização das transações do usuário;
- Cadastro de transações;
- Edição de transações;
- Exclusão de transações.

## Atendimento às User Stories

As classes modeladas permitem implementar todas as User Stories definidas para o projeto:

| User Story | Classes Envolvidas |
|------------|--------------------|
| US01 – Cadastrar Conta | AuthController, UserService e User |
| US02 – Realizar Login | AuthController, UserService |
| US03 – Visualizar Dashboard | TransactionController, TransactionService e Transaction |
| US04 – Cadastrar Transação | TransactionController, TransactionService, Transaction e TransactionDTO |
| US05 – Editar Transação | TransactionController, TransactionService, Transaction e TransactionDTO |
| US06 – Excluir Transação | TransactionController, TransactionService e Transaction |

## Diagrama

![Diagrama de Classes](./diagrama_classes.png)