import { pool } from '../config/db';
import { User } from '../models/User';
import { IUserRepository } from './IUserRepository';
import { v4 as uuidv4 } from 'uuid'; // Gerador de IDs

export class UserRepository implements IUserRepository {
  
  public async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows]: any = await pool.execute(query, [email]);

    if (rows.length === 0) {
      return null;
    }

    const u = rows[0];
    // Transformamos a resposta do banco de dados na nossa Classe Clássica
    return new User(u.id, u.name, u.email, u.password);
  }

  public async save(name: string, email: string, passwordHash: string): Promise<User> {
    const id = uuidv4();
    const query = 'INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, NOW())';
    
    // Executa o SQL na mão
    await pool.execute(query, [id, name, email, passwordHash]);

    return new User(id, name, email, passwordHash);
  }

  public async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows]: any = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    const u = rows[0];
    return new User(u.id, u.name, u.email, u.password);
  }
}