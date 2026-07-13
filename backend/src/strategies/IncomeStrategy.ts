import { ITransactionStrategy } from "./ITransactionStrategy";

export class IncomeStrategy implements ITransactionStrategy {
  public calculateImpact(amount: number): number {
    return Math.abs(amount); // Receita é sempre um valor positivo a somar
  }
}