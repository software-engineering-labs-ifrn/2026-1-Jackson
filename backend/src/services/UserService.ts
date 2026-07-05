import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
  // Instanciamos o repositório do TypeORM que vai falar com a tabela 'users'
  private userRepository = AppDataSource.getRepository(User);

  async createUser(data: any): Promise<User> {
    // 1. Regra de Negócio: Verificar se o e-mail já existe
    const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("Este e-mail já está em uso.");
    }

    // 2. Regra de Negócio: Criptografar a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Criar e guardar o objeto
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}