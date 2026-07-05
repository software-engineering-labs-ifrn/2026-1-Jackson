# Especificação dos Casos de Uso

Este documento detalha a modelagem funcional do sistema **Meu Orçamento**, refletindo as interações diretas do usuário e as dependências arquiteturais entre as funcionalidades.

## 👥 Ator do Sistema
* **Usuário:** Representa a pessoa física que interage com a aplicação para o controle das suas finanças pessoais.

## ⚙️ Casos de Uso e Relacionamentos
1. **Cadastrar Conta:** O usuário cria o seu perfil no sistema.
2. **Realizar Login:** O usuário autentica-se na plataforma.
3. **Visualizar Dashboard:** O usuário acede ao painel principal onde lista o seu resumo financeiro e as suas transações.
4. **Cadastrar Transação:** O usuário regista uma nova receita ou despesa de forma direta.
5. **Editar Transação:** O usuário altera os dados de uma movimentação existente. *(Depende obrigatoriamente da ação prévia de visualização, utilizando o relacionamento `<<include>>` para Visualizar Dashboard).*
6. **Excluir Transação:** O usuário apaga um registo financeiro. *(Depende obrigatoriamente da ação prévia de visualização, utilizando o relacionamento `<<include>>` para Visualizar Dashboard).*
