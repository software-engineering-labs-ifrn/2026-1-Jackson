import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users") // Nome da tabela no banco de dados
export class User {
  // Usamos UUID (string alfanumérica) por segurança, em vez de 1, 2, 3...
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  // O Relacionamento: Um utilizador pode ter VÁRIAS transações
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;
}