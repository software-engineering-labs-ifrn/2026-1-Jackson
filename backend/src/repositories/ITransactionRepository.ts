import { Transaction } from "../models/Transaction";

export interface ITransactionRepository {
  create(transaction: Transaction, userId: string): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findByIdAndUserId(id: string, userId: string): Promise<Transaction | null>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string, userId: string): Promise<void>;
}