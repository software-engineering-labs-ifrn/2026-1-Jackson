# User Stories e Critérios de Aceitação

### US01 - Cadastrar Conta
- **Como usuário**
- **Eu quero cadastrar uma nova conta**
- **Para que eu possa ter um ambiente seguro para gerenciar minhas finanças**

**Critérios de Aceitação:**

* **Cenário 1: Cadastro realizado com sucesso (Caminho Feliz)**
  - [ ] **Dado que** eu estou na página inicial e escolho a opção de criar conta
  - [ ] **Quando** eu informar os dados válidos (Nome, E-mail novo e Senha com no mínimo 6 caracteres)
  - [ ] **Então** o sistema deve registrar a conta no banco de dados e me redirecionar para a tela de login exibindo "Conta criada com sucesso!".

* **Cenário 2: Erro ao utilizar e-mail já cadastrado (Caminho de Erro)**
  - [ ] **Dado que** eu estou no formulário de criação de conta
  - [ ] **Quando** eu tentar me cadastrar utilizando um e-mail que já existe no sistema
  - [ ] **Então** o sistema deve bloquear o cadastro e exibir a mensagem de erro "Este e-mail já está em uso."

---

### US02 - Realizar Login
- **Como usuário**
- **Eu quero realizar login no sistema**
- **Para que eu possa acessar meu painel financeiro**

**Critérios de Aceitação:**

* **Cenário 1: Login realizado com sucesso (Caminho Feliz)**
  - [ ] **Dado que** eu estou na página de login do sistema
  - [ ] **Quando** eu informar meu E-mail e Senha corretamente
  - [ ] **Então** o sistema deve me autenticar e me redirecionar imediatamente para a tela do Dashboard.

* **Cenário 2: Erro de credenciais inválidas (Caminho de Erro)**
  - [ ] **Dado que** eu estou na página de login
  - [ ] **Quando** eu informar um e-mail não cadastrado ou errar a minha senha
  - [ ] **Então** o sistema não deve permitir a entrada e deve exibir a mensagem de erro "Credenciais inválidas".

---

### US03 - Visualizar Dashboard
- **Como usuário autenticado**
- **Eu quero visualizar um dashboard com o resumo das minhas finanças**
- **Para que eu possa acompanhar meu saldo, receitas e despesas totais**

**Critérios de Aceitação:**

* **Cenário 1: Carregamento do painel (Caminho Feliz)**
  - [ ] **Dado que** eu realizei o login com sucesso
  - [ ] **Quando** o sistema carregar a página principal
  - [ ] **Então** o sistema deve calcular e exibir o Saldo Atual, Total de Receitas, Total de Despesas e a lista do histórico de transações.

---

### US04 - Cadastrar Transação
- **Como usuário autenticado**
- **Eu quero cadastrar uma nova transação financeira**
- **Para que eu possa registrar minhas receitas e despesas**

**Critérios de Aceitação:**

* **Cenário 1: Transação salva com sucesso (Caminho Feliz)**
  - [ ] **Dado que** eu estou no Dashboard e abro o formulário de nova transação
  - [ ] **Quando** eu preencher todos os campos corretamente (Descrição, Valor positivo, Tipo, Categoria e Data)
  - [ ] **Então** o sistema deve salvar o registro e atualizar os totais do Dashboard imediatamente.

* **Cenário 2: Erro de campos incompletos ou inválidos (Caminho de Erro)**
  - [ ] **Dado que** eu estou preenchendo o formulário de nova transação
  - [ ] **Quando** eu deixar um campo obrigatório em branco ou tentar inserir um texto no campo "Valor"
  - [ ] **Então** o sistema deve impedir o salvamento e exibir alertas indicando quais campos precisam ser corrigidos.

---

### US05 - Editar Transação
- **Como usuário autenticado**
- **Eu quero editar as informações de uma transação existente**
- **Para que eu possa corrigir valores ou descrições cadastradas erroneamente**

**Critérios de Aceitação:**

* **Cenário 1: Atualização com sucesso (Caminho Feliz)**
  - [ ] **Dado que** eu estou no Dashboard visualizando a lista de transações
  - [ ] **Quando** eu clicar em editar uma transação e alterar seus dados para valores válidos
  - [ ] **Então** o sistema deve atualizar os dados, recalcular o saldo e fechar o formulário.

* **Cenário 2: Erro de permissão ao editar (Caminho de Erro)**
  - [ ] **Dado que** eu tento enviar uma edição ao servidor
  - [ ] **Quando** o sistema não encontrar a transação ou ela não pertencer ao meu usuário
  - [ ] **Então** o sistema deve cancelar a operação e exibir o erro "Transação não encontrada ou você não tem permissão para editá-la."

---

### US06 - Excluir Transação
- **Como usuário autenticado**
- **Eu quero excluir o registro de uma transação específica**
- **Para que eu possa remover duplicidades ou registros incorretos do meu fluxo de caixa**

**Critérios de Aceitação:**

* **Cenário 1: Exclusão confirmada (Caminho Feliz)**
  - [ ] **Dado que** eu escolho a opção de excluir uma transação
  - [ ] **Quando** eu confirmar a intenção de exclusão na mensagem de alerta
  - [ ] **Então** o sistema deve removê-la do banco de dados e exibir a mensagem "Transação removida com sucesso!".