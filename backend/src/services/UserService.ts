import { User } from "../models/User";
import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: any): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Este e-mail já está em uso.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.userRepository.save(data.name, data.email, hashedPassword);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}