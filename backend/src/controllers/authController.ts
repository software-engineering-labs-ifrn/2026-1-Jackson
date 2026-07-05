import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Dica de Arquitetura: Usamos arrow functions (=>) para o 'this' não se perder no Express
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      
      // Omitir a password na resposta por segurança
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        res.status(400).json({ error: "Credenciais inválidas" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Credenciais inválidas" });
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "sua_chave_secreta_jwt",
        { expiresIn: "1d" }
      );

      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error: any) {
      res.status(500).json({ error: "Erro no servidor ao fazer login" });
    }
  };

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const user = await this.userService.findUserById(userId);
      
      if (!user) {
        res.status(404).json({ error: "Utilizador não encontrado" });
        return;
      }

      res.json({ name: user.name, email: user.email });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao buscar perfil" });
    }
  };
}

export default new AuthController();