import { User } from "../models/User";

// O "I" no início é uma convenção clássica para Interfaces
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(name: string, email: string, passwordHash: string): Promise<User>;
  findById(id: string): Promise<User | null>;
}