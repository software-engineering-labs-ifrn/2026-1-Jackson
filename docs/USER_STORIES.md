# User Stories

### US01 - Cadastrar Conta
- **Como usuário**
- **Eu quero cadastrar uma nova conta**
- **Para que eu possa ter um ambiente seguro para gerenciar minhas finanças**

**Critérios de Aceitação:**
- [ ] **Dado que eu estou na página inicial e escolho a opção de criar conta**
- [ ] **Quando eu informar sequencialmente os dados de cadastro**
  - [ ] Nome completo (Apenas letras e espaços)
  - [ ] E-mail (Formato válido: usuario@email.com)
  - [ ] Senha (Mínimo de 6 caracteres)
- [ ] **Então o sistema deve registrar a conta no banco de dados e me redirecionar para a tela de login exibindo a mensagem "Conta criada com sucesso!"**

---

### US02 - Realizar Login
- **Como usuário**
- **Eu quero realizar login no sistema**
- **Para que eu possa acessar meu painel financeiro**

**Critérios de Aceitação:**
- [ ] **Dado que eu estou na página de login do sistema**
- [ ] **Quando eu informar minhas credenciais corretamente**
  - [ ] E-mail cadastrado
  - [ ] Senha correspondente
- [ ] **Então o sistema deve me autenticar e me redirecionar imediatamente para a tela do Dashboard.**

---

### US03 - Visualizar Dashboard
- **Como usuário autenticado**
- **Eu quero visualizar um dashboard com o resumo das minhas finanças**
- **Para que eu possa acompanhar meu saldo, receitas e despesas totais**

**Critérios de Aceitação:**
- [ ] **Dado que eu realizei o login com sucesso**
- [ ] **Quando o sistema carregar a página principal (Dashboard)**
- [ ] **Então o sistema deve exibir os seguintes dados calculados com base nas minhas transações:**
  - [ ] Saldo Atual
  - [ ] Total de Receitas
  - [ ] Total de Despesas
  - [ ] Uma lista com o histórico das minhas transações registradas

---

### US04 - Cadastrar Transação
- **Como usuário autenticado**
- **Eu quero cadastrar uma nova transação financeira**
- **Para que eu possa registrar minhas receitas e despesas**

**Critérios de Aceitação:**
- [ ] **Dado que eu estou no Dashboard e clico no botão de adicionar nova transação**
- [ ] **Quando eu informar sequencialmente os dados da transação**
  - [ ] Descrição da transação (Texto)
  - [ ] Valor (Número positivo)
  - [ ] Tipo (Receita ou Despesa)
  - [ ] Data da transação
- [ ] **Então o sistema deve salvar a transação, atualizar os totais exibidos no Dashboard e fechar o formulário.**

---

### US05 - Editar Transação
- **Como usuário autenticado**
- **Eu quero editar as informações de uma transação existente**
- **Para que eu possa corrigir valores ou descrições cadastradas erroneamente**

**Critérios de Aceitação:**
- [ ] **Dado que eu estou no Dashboard visualizando a lista de transações**
- [ ] **Quando eu selecionar a opção de editar em uma transação específica e alterar para um valor válido**
- [ ] **Então o sistema deve atualizar os dados da transação no banco de dados, recalcular o saldo do Dashboard e exibir os dados atualizados na tela.**

---

### US06 - Excluir Transação
- **Como usuário autenticado**
- **Eu quero excluir o registro de uma transação específica**
- **Para que eu possa remover duplicidades ou registros incorretos do meu fluxo de caixa**

**Critérios de Aceitação:**
- [ ] **Dado que eu estou no Dashboard visualizando a lista de transações**
- [ ] **E escolho a opção de excluir em uma transação específica**
- [ ] **Devo confirmar a intenção de exclusão em uma mensagem de alerta**
- [ ] **Então o sistema deve remover a transação do banco de dados, atualizar o saldo geral e exibir a mensagem "Transação removida com sucesso!"**