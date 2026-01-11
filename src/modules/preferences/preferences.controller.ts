import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { Prisma } from '@prisma/client';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() data: Prisma.PreferenceCreateInput) {
    return this.preferencesService.create(data);
  }

  @Get()
  findAll() {
    return this.preferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferencesService.findOne(+id);
  }
}
