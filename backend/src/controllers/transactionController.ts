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
      const t = await this.transactionService.createTransaction(req.body, userId);
      
      // Converte o objeto de Classe Clássica num formato simples para o Frontend
      res.status(201).json({
        id: t.getId(),
        description: t.getDescription(),
        amount: t.getAmount(),
        type: t.getType(),
        category: t.getCategory(),
        date: t.getDate()
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const transactions = await this.transactionService.getTransactionsByUser(userId);
      
      // Mapeia a lista de objetos Clássicos para o Frontend
      const result = transactions.map(t => ({
        id: t.getId(),
        description: t.getDescription(),
        amount: t.getAmount(),
        type: t.getType(),
        category: t.getCategory(),
        date: t.getDate()
      }));

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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

      const t = await this.transactionService.updateTransaction(transactionId, userId, req.body);
      res.json({
        id: t.getId(),
        description: t.getDescription(),
        amount: t.getAmount(),
        type: t.getType(),
        category: t.getCategory(),
        date: t.getDate()
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
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
}

export default new TransactionController();