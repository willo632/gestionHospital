import { Injectable, NotFoundException } from '@nestjs/common';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacientesDto } from './dto/update-pacientes.dto';
import { CreatePacientesDto } from './dto/create-pacientes.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PacientesService {
      constructor(
    @InjectRepository(Paciente)
    private readonly pacientesRepo: Repository<Paciente>,
  ) {}

  findAll(): Promise<Paciente[]> {
    return this.pacientesRepo.find({ order: { apellido: 'ASC' } });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacientesRepo.findOne({ where: { paciente_id: id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    return paciente;
  }

  create(dto: CreatePacientesDto): Promise<Paciente> {
    const paciente = this.pacientesRepo.create(dto);
    return this.pacientesRepo.save(paciente);
  }

  async update(id: number, dto: UpdatePacientesDto): Promise<Paciente> {
    const paciente = await this.findOne(id);
    Object.assign(paciente, dto);
    return this.pacientesRepo.save(paciente);
  }

  async remove(id: number): Promise<void> {
    const paciente = await this.findOne(id);
    await this.pacientesRepo.remove(paciente);
  }
}
