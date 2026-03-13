import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicosService } from './topicos.service';
import { CreateTopicoDto } from './dto/create-topico.dto';
import { UpdateTopicoDto } from './dto/update-topico.dto';

@Controller('topicos')
export class TopicosController {
  constructor(private readonly topicosService: TopicosService) {}

  @Post()
  create(@Body() createTopicoDto: CreateTopicoDto) {
    return this.topicosService.create(createTopicoDto);
  }

  @Get()
  findAll() {
    return this.topicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicoDto: UpdateTopicoDto) {
    return this.topicosService.update(+id, updateTopicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicosService.remove(+id);
  }
}
