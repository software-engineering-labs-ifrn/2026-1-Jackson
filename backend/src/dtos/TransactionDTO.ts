export interface TransactionDTO {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; 
}