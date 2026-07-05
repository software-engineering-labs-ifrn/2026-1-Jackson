import { AppDataSource } from "../config/db";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";
import { TransactionDTO } from "../dtos/TransactionDTO";

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private userRepository = AppDataSource.getRepository(User);

  async createTransaction(data: TransactionDTO, userId: string): Promise<Transaction> {
    // Regra de Segurança: Garantir que o utilizador existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Utilizador não encontrado.");
    }

    // Criar a transação fazendo a ligação Orientada a Objetos com a entidade User
    const transaction = this.transactionRepository.create({
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
      user: user // O TypeORM preenche automaticamente a chave estrangeira (user_id) no MySQL
    });

    return await this.transactionRepository.save(transaction);
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { user: { id: userId } },
      order: { date: "DESC" }
    });
  }

  async deleteTransaction(transactionId: string, userId: string): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId, user: { id: userId } }
    });

    if (!transaction) {
      throw new Error("Transação não encontrada ou não autorizada.");
    }

    await this.transactionRepository.remove(transaction);
  }

  async updateTransaction(transactionId: string, userId: string, data: Partial<TransactionDTO>): Promise<Transaction> {
    // 1. Procura a transação que pertence a este utilizador
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId, user: { id: userId } }
    });

    if (!transaction) {
      throw new Error("Transação não encontrada ou você não tem permissão para editá-la.");
    }

    // 2. Mescla os dados antigos com os novos e salva
    this.transactionRepository.merge(transaction, data);
    return await this.transactionRepository.save(transaction);
  }
}