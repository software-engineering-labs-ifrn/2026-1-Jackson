import { pool } from '../config/db';
import { Transaction } from '../models/Transaction';
import { ITransactionRepository } from './ITransactionRepository';

export class TransactionRepository implements ITransactionRepository {
  
  public async create(transaction: Transaction, userId: string): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (id, description, amount, type, category, date, user_id, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    await pool.execute(query, [
      transaction.getId(),
      transaction.getDescription(),
      transaction.getAmount(),
      transaction.getType(),
      transaction.getCategory(),
      transaction.getDate(),
      userId
    ]);
    return transaction;
  }

  public async findByUserId(userId: string): Promise<Transaction[]> {
    const query = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC';
    const [rows]: any = await pool.execute(query, [userId]);

    return rows.map((row: any) => new Transaction(
      row.id, row.description, Number(row.amount), row.type, row.category, row.date
    ));
  }

  public async findByIdAndUserId(id: string, userId: string): Promise<Transaction | null> {
    const query = 'SELECT * FROM transactions WHERE id = ? AND user_id = ?';
    const [rows]: any = await pool.execute(query, [id, userId]);

    if (rows.length === 0) return null;
    const row = rows[0];
    return new Transaction(row.id, row.description, Number(row.amount), row.type, row.category, row.date);
  }

  public async update(transaction: Transaction): Promise<Transaction> {
    const query = `
      UPDATE transactions 
      SET description = ?, amount = ?, type = ?, category = ?, date = ? 
      WHERE id = ?
    `;
    await pool.execute(query, [
      transaction.getDescription(),
      transaction.getAmount(),
      transaction.getType(),
      transaction.getCategory(),
      transaction.getDate(),
      transaction.getId()
    ]);
    return transaction;
  }

  public async delete(id: string, userId: string): Promise<void> {
    const query = 'DELETE FROM transactions WHERE id = ? AND user_id = ?';
    await pool.execute(query, [id, userId]);
  }
}