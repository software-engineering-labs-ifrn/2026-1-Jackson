import { AppDataSource } from "../config/db";
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private userRepository = AppDataSource.getRepository(User);

  async createTransaction(data: any, userId: string): Promise<Transaction> {
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
}