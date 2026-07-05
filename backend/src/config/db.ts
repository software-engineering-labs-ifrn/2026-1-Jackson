import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";              
import { Transaction } from "../entities/Transaction";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root", // A senha que definimos no Docker
  database: "meu_orcamento", // O banco que definimos no Docker
  synchronize: true, // Cria as tabelas automaticamente (perfeito para projetos académicos)
  logging: false,
  entities: [User, Transaction], 
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Conectado ao MySQL via Docker e TypeORM!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MySQL:", error);
    process.exit(1);
  }
};