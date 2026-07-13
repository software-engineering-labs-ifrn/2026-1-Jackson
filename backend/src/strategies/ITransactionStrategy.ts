export interface ITransactionStrategy {
  calculateImpact(amount: number): number;
}