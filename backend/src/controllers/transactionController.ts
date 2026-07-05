import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const transaction = await this.transactionService.createTransaction(req.body, userId);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const transactions = await this.transactionService.getTransactionsByUser(userId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const transactionId = req.params.id as string;
      
      if (!transactionId) {
        res.status(400).json({ error: "ID da transação não fornecido." });
        return;
      }
      
      await this.transactionService.deleteTransaction(transactionId, userId);
      res.json({ message: "Transação removida com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const transactionId = req.params.id as string;
      
      if (!transactionId) {
        res.status(400).json({ error: "ID da transação não fornecido." });
        return;
      }

      const transaction = await this.transactionService.updateTransaction(transactionId, userId, req.body);
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new TransactionController();