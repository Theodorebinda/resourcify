import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Assure-toi que la route est bien définie comme 'users'
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users - Récupère tous les utilisateurs
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
  async remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
