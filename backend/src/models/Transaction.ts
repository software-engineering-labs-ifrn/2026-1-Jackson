import { ITransactionStrategy } from "../strategies/ITransactionStrategy";
import { IncomeStrategy } from "../strategies/IncomeStrategy";
import { ExpenseStrategy } from "../strategies/ExpenseStrategy";

export class Transaction {
  private id: string;
  private description: string;
  private amount: number;
  private type: string;
  private category: string;
  private date: string;

  constructor(id: string, description: string, amount: number, type: string, category: string, date: string) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = date;
  }

  // Getters
  public getId(): string { return this.id; }
  public getDescription(): string { return this.description; }
  public getAmount(): number { return this.amount; }
  public getType(): string { return this.type; }
  public getCategory(): string { return this.category; }
  public getDate(): string { return this.date; }

  // Setters
  public setDescription(description: string): void { this.description = description; }
  public setAmount(amount: number): void { this.amount = amount; }
  public setType(type: string): void { this.type = type; }
  public setCategory(category: string): void { this.category = category; }
  public setDate(date: string): void { this.date = date; }

  public getNetAmount(): number {
    let strategy: ITransactionStrategy;
    
    if (this.type === 'income') {
      strategy = new IncomeStrategy();
    } else {
      strategy = new ExpenseStrategy();
    }
    
    return strategy.calculateImpact(this.amount);
  }
}