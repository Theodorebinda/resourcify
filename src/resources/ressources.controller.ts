import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get() //get all resources
  findAll() {
    const resources = this.resourcesService.findAll();
    if (!resources) {
      return { message: 'Aucune ressource trouvée' }; // Message si aucune ressource
    }
    return resources;
  }

  @Get(':id') //get handle ressources
  findOne(@Param('id') id: number) {
    return this.resourcesService.findOne(+id);
  }

  @Post()
  create(@Body() data: any) {
    return this.resourcesService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.resourcesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.resourcesService.delete(+id);
  }
}
