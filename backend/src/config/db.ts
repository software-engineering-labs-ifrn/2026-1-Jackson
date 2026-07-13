import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root', 
  database: process.env.DB_NAME || 'meu_orcamento',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("📦 Conectado ao MySQL de forma Clássica (Raw SQL)!");
    
    // Cria a tabela de utilizadores se não existir
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cria a tabela de transações com a Chave Estrangeira (user_id) ligada aos users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id VARCHAR(36) PRIMARY KEY,
        description VARCHAR(255),
        amount DECIMAL(10,2),
        type VARCHAR(50),
        category VARCHAR(100),
        date DATE,
        user_id VARCHAR(36),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    connection.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao MySQL ou criar tabelas:", error);
    process.exit(1);
  }
};