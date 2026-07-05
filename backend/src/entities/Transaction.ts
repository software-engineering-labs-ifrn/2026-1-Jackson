import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("transactions") // Nome correto da tabela no MySQL
export class Transaction {
  // ATENÇÃO: Aqui o nome tem que ser apenas "id" (sem underline!)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Remova qualquer { unique: true } que possa existir aqui!
  @Column({ type: "varchar", length: 255 })
  description!: string;

  // decimal para guardar dinheiro corretamente (ex: 1500.50)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "varchar", length: 50 })
  type!: string;

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "date" })
  date!: string;

  // Relacionamento: Várias transações pertencem a 1 Utilizador
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "user_id" }) // Cria a coluna user_id na tabela
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}