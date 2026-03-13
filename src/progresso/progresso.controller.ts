import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressoService } from './progresso.service';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';

@Controller('progresso')
export class ProgressoController {
  constructor(private readonly progressoService: ProgressoService) {}

  @Post()
  create(@Body() createProgressoDto: CreateProgressoDto) {
    return this.progressoService.create(createProgressoDto);
  }

  @Get()
  findAll() {
    return this.progressoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressoDto: UpdateProgressoDto) {
    return this.progressoService.update(+id, updateProgressoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressoService.remove(+id);
  }
}
