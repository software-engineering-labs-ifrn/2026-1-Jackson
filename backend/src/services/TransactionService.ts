import { Transaction } from "../models/Transaction";
import { ITransactionRepository } from "../repositories/ITransactionRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { v4 as uuidv4 } from 'uuid';

export class TransactionService {
  // O Serviço depende da Interface (Contrato), seguindo o princípio DIP do SOLID
  private transactionRepo: ITransactionRepository;

  constructor() {
    this.transactionRepo = new TransactionRepository();
  }

  async createTransaction(data: any, userId: string): Promise<Transaction> {
    // Instancia o objeto usando a Classe Clássica
    const newTransaction = new Transaction(
      uuidv4(),
      data.description,
      Number(data.amount),
      data.type,
      data.category,
      data.date
    );

    return await this.transactionRepo.create(newTransaction, userId);
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return await this.transactionRepo.findByUserId(userId);
  }

  async updateTransaction(transactionId: string, userId: string, data: any): Promise<Transaction> {
    const transaction = await this.transactionRepo.findByIdAndUserId(transactionId, userId);
    
    if (!transaction) {
      throw new Error("Transação não encontrada ou você não tem permissão para editá-la.");
    }

    // Usa os Setters clássicos para atualizar os dados do objeto em memória
    transaction.setDescription(data.description);
    transaction.setAmount(Number(data.amount));
    transaction.setType(data.type);
    transaction.setCategory(data.category);
    transaction.setDate(data.date);

    return await this.transactionRepo.update(transaction);
  }

  async deleteTransaction(transactionId: string, userId: string): Promise<void> {
    const transaction = await this.transactionRepo.findByIdAndUserId(transactionId, userId);
    if (!transaction) {
      throw new Error("Transação não encontrada.");
    }
    await this.transactionRepo.delete(transactionId, userId);
  }
}