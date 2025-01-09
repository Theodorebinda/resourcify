import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() data: any) {
    data.password = await this.hashPassword(data.password);
    return this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt .genSalt();
    return bcrypt.hash(password, salt);
  }
}
