import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth.token.guard';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  create(@Body() createMateriaDto: CreateMateriaDto,
  @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto
  ) {
    return this.materiaService.create(createMateriaDto, tokenPayloadDto);
  }

  @Get()
  findAll() {
    return this.materiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.materiaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materiaService.remove(id);
  }
}
