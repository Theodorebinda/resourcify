import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Implémente findByEmail dans UsersService
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result; // Renvoie l'utilisateur sans le mot de passe
    }
    throw new UnauthorizedException('Email ou mot de passe incorrect');
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

