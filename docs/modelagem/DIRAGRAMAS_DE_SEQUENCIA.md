# Diagramas de Sequência

## US01 - Cadastrar Conta
**Fluxo:** O cliente envia os dados. O sistema verifica se o e-mail já existe; se sim, retorna erro (`alt` block). Se não, insere no banco de dados.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant AuthController
    participant UserService
    participant UserRepository
    participant DB as MySQL DB

    Cliente->>AuthController: POST /register (dados)
    activate AuthController
    AuthController->>UserService: createUser(dados)
    activate UserService
    
    UserService->>UserRepository: findByEmail(email)
    activate UserRepository
    UserRepository->>DB: SELECT * FROM users
    activate DB
    DB-->>UserRepository: row (se existir) ou vazio
    deactivate DB
    UserRepository-->>UserService: User ou null
    deactivate UserRepository

    alt E-mail já cadastrado (Erro)
        UserService-->>AuthController: Throw Error("Este e-mail já está em uso.")
        AuthController-->>Cliente: 400 Bad Request {error}
    else Sucesso (Caminho Feliz)
        UserService->>UserRepository: save(name, email, hashedPassword)
        activate UserRepository
        UserRepository->>DB: INSERT INTO users
        activate DB
        DB-->>UserRepository: success
        deactivate DB
        UserRepository-->>UserService: User
        deactivate UserRepository
        UserService-->>AuthController: User
        AuthController-->>Cliente: 201 Created (id, name, email)
    end
    
    deactivate UserService
    deactivate AuthController
```

---

## US02 - Realizar Login
**Fluxo:** O sistema busca o e-mail, compara o *hash* da senha e, se for válido, assina um *token JWT*.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant AuthController
    participant UserService
    participant UserRepository
    participant DB as MySQL DB

    Cliente->>AuthController: POST /login (email, senha)
    activate AuthController
    
    AuthController->>UserService: findUserByEmail(email)
    activate UserService
    UserService->>UserRepository: findByEmail(email)
    activate UserRepository
    UserRepository->>DB: SELECT * FROM users
    activate DB
    DB-->>UserRepository: row
    deactivate DB
    UserRepository-->>UserService: User ou null
    deactivate UserRepository
    UserService-->>AuthController: User ou null
    deactivate UserService

    alt Credenciais Inválidas (Erro)
        AuthController-->>Cliente: 400 Bad Request ("Credenciais inválidas")
    else Sucesso (Caminho Feliz)
        AuthController->>AuthController: bcrypt.compare(senha, hash)
        AuthController->>AuthController: jwt.sign(userId)
        AuthController-->>Cliente: 200 OK (token, user)
    end
    
    deactivate AuthController
```

---

## US03 - Visualizar Dashboard
**Fluxo:** O cliente autenticado solicita a lista de transações. O Controller busca através do Service e devolve os dados mapeados para o frontend.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant TransactionController
    participant TransactionService
    participant TransactionRepository
    participant DB as MySQL DB

    Cliente->>TransactionController: GET /transactions
    activate TransactionController
    
    TransactionController->>TransactionService: getTransactionsByUser(userId)
    activate TransactionService
    TransactionService->>TransactionRepository: findByUserId(userId)
    activate TransactionRepository
    TransactionRepository->>DB: SELECT * FROM transactions ORDER BY date DESC
    activate DB
    DB-->>TransactionRepository: rows
    deactivate DB
    
    TransactionRepository-->>TransactionService: Transaction[] (Objetos)
    deactivate TransactionRepository
    TransactionService-->>TransactionController: Transaction[]
    deactivate TransactionService
    
    TransactionController->>TransactionController: map(t => t.getters())
    TransactionController-->>Cliente: 200 OK (JSON array)
    
    deactivate TransactionController
```

---

## US04 - Cadastrar Transação
**Fluxo:** Instanciação da classe Clássica `Transaction` e delegação da persistência ao repositório de SQL puro.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant TransactionController
    participant TransactionService
    participant TransactionRepository
    participant DB as MySQL DB

    Cliente->>TransactionController: POST /transactions (dados)
    activate TransactionController
    
    TransactionController->>TransactionService: createTransaction(dados, userId)
    activate TransactionService
    
    TransactionService->>TransactionService: new Transaction(...)
    
    TransactionService->>TransactionRepository: create(transaction, userId)
    activate TransactionRepository
    TransactionRepository->>DB: INSERT INTO transactions
    activate DB
    DB-->>TransactionRepository: success
    deactivate DB
    TransactionRepository-->>TransactionService: Transaction
    deactivate TransactionRepository
    
    TransactionService-->>TransactionController: Transaction
    deactivate TransactionService
    
    TransactionController-->>Cliente: 201 Created (JSON)
    
    deactivate TransactionController
```

---

## US05 - Editar Transação
**Fluxo:** Verifica a existência e permissão do recurso. Atualiza utilizando os *Setters* da classe e salva no banco.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant TransactionController
    participant TransactionService
    participant TransactionRepository
    participant DB as MySQL DB

    Cliente->>TransactionController: PUT /transactions/:id (dados)
    activate TransactionController
    
    TransactionController->>TransactionService: updateTransaction(id, userId, dados)
    activate TransactionService
    
    TransactionService->>TransactionRepository: findByIdAndUserId(id, userId)
    activate TransactionRepository
    TransactionRepository->>DB: SELECT * FROM transactions
    activate DB
    DB-->>TransactionRepository: row
    deactivate DB
    TransactionRepository-->>TransactionService: Transaction ou null
    deactivate TransactionRepository

    alt Transação não pertence ao usuário (Erro)
        TransactionService-->>TransactionController: Throw Error("Transação não encontrada...")
        TransactionController-->>Cliente: 400 Bad Request {error}
    else Sucesso
        TransactionService->>TransactionService: t.setAttributes(...)
        TransactionService->>TransactionRepository: update(transaction)
        activate TransactionRepository
        TransactionRepository->>DB: UPDATE transactions
        activate DB
        DB-->>TransactionRepository: success
        deactivate DB
        TransactionRepository-->>TransactionService: Transaction
        deactivate TransactionRepository
        
        TransactionService-->>TransactionController: Transaction
        TransactionController-->>Cliente: 200 OK (JSON)
    end
    
    deactivate TransactionService
    deactivate TransactionController
```

---

## US06 - Excluir Transação
**Fluxo:** Verifica a existência da transação pelo ID e UserID e executa a exclusão em cascata ou direta via SQL.

```mermaid
sequenceDiagram
    autonumber
    actor Cliente
    participant TransactionController
    participant TransactionService
    participant TransactionRepository
    participant DB as MySQL DB

    Cliente->>TransactionController: DELETE /transactions/:id
    activate TransactionController
    
    TransactionController->>TransactionService: deleteTransaction(id, userId)
    activate TransactionService
    
    TransactionService->>TransactionRepository: findByIdAndUserId(id, userId)
    activate TransactionRepository
    TransactionRepository->>DB: SELECT * FROM transactions
    activate DB
    DB-->>TransactionRepository: row
    deactivate DB
    TransactionRepository-->>TransactionService: Transaction ou null
    deactivate TransactionRepository

    alt Não encontrada (Erro)
        TransactionService-->>TransactionController: Throw Error
        TransactionController-->>Cliente: 400 Bad Request
    else Sucesso
        TransactionService->>TransactionRepository: delete(id, userId)
        activate TransactionRepository
        TransactionRepository->>DB: DELETE FROM transactions
        activate DB
        DB-->>TransactionRepository: success
        deactivate DB
        TransactionRepository-->>TransactionService: void
        deactivate TransactionRepository
        
        TransactionService-->>TransactionController: void
        TransactionController-->>Cliente: 200 OK ("Removida com sucesso")
    end
    
    deactivate TransactionService
    deactivate TransactionController
```