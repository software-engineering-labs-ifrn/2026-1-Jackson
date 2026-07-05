import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "enum", enum: ["income", "expense"] })
  type!: "income" | "expense";

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "date" })
  date!: string;

  // A Chave Estrangeira: Várias transações pertencem a UM utilizador
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" }) // Vai criar uma coluna 'user_id' no MySQL
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}