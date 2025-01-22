import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("register")
  async register(@Body() data: any) {
    // Hachage du mot de passe avant la création de l'utilisateur
    data.password = await this.hashPassword(data.password);
    return this.usersService.create(data);
  }

  @Post("login")
  async login(@Body() body: any) {
    const { email, password } = body;

    // Valider l'utilisateur
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Appeler la méthode `login` avec l'utilisateur valide
    return this.authService.login(user);
  }

  // Méthode pour hacher les mots de passe
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
