import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users') // Assure-toi que la route est bien définie comme 'users'
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users - Récupère tous les utilisateurs
  // @Roles('user')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // GET /users/:id - Récupère un utilisateur par ID
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users - Crée un utilisateur
  async create(@Body() data: any) {
    return this.usersService.create(data);
  }

  @Patch(':id') // PATCH /users/:id - Met à jour un utilisateur
  async update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id') // DELETE /users/:id - Supprime un utilisateur
  @Roles('admin') //
  async remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
