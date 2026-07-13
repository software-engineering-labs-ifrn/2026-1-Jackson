import { ITransactionStrategy } from "./ITransactionStrategy";

export class ExpenseStrategy implements ITransactionStrategy {
  public calculateImpact(amount: number): number {
    return -Math.abs(amount); // Despesa transforma o valor em negativo para subtrair
  }
}