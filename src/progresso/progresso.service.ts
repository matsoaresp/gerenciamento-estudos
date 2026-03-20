import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progresso } from './entities/progresso.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { Topico } from 'src/topicos/entities/topico.entity';
import { Metas } from 'src/metas/entities/meta.entity';
import { TopicosEnum } from 'src/topicos/enum/topicos.enum';

@Injectable()
export class ProgressoService {

  constructor(
    @InjectRepository(Progresso)
    private readonly progressoRepository: Repository<Progresso>,
    @InjectRepository(Topico)
    private readonly topicosRepository: Repository<Topico>,
    @InjectRepository(Metas)
    private readonly metasRepository: Repository<Metas>,
  ){}
  async create(createProgressoDto: CreateProgressoDto) {

    const topico = await this.topicosRepository.findOne({
      where: {id: createProgressoDto.topicoId}
    })

    if (!topico) {
      throw new NotFoundException('Topico não encontrado')
    }

    const meta = await this.metasRepository.findOne({
  where: {
    topico: {
      id: createProgressoDto.topicoId
    }
  },
  relations: ['topico']
})

    if(!meta) {
      throw new NotFoundException('Meta não encontrada')
    }
    
    meta.horasAtual += createProgressoDto.horasEstudadas;
    await this.metasRepository.save(meta)

    const progresso = Math.min(
      Math.round((meta?.horasAtual / meta?.horasMeta) * 100),100
    )

    if (progresso >= 100){
      topico.status = TopicosEnum.CONCLUIDO
    } else if (progresso > 0) {
      topico.status = TopicosEnum.ESTUDANDO
    }else {
      topico.status = TopicosEnum.PENDENTE
    }

    await this.topicosRepository.save(topico)
 
    const progress = this.progressoRepository.create({
      porcentagem: progresso,
      horasEstudadas: createProgressoDto.horasEstudadas,
      topico
    })

    if (!progress){
      throw new NotFoundException('Não foi possivel criar o progresso')
    }

    return await this.progressoRepository.save(progress)
  }

  findAll() {
    return this.progressoRepository.find({
      relations: ['topico']
    });
  }

  findOne(id: number) {
    return this.progressoRepository.findOne({
      where: { id },
      relations: ['topico']
    });
  }

  async update(id: number, updateProgressoDto: UpdateProgressoDto) {
    const progress = await this.progressoRepository.preload({
      id,
      ...updateProgressoDto
    })
    if (!progress){
      throw new NotFoundException('Dado do progresso não encontrado')
    }
    return await this.progressoRepository.save(progress)
  }

  async remove(id: number) {

    const progress = await this.progressoRepository.findOne({
      where: { id }
    });

    if (!progress) {
      throw new NotFoundException('Progresso não encontrado');
    }

    return this.progressoRepository.remove(progress);
  }
}