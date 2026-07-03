
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita} from './entities/cita.entity';
import { UpdateCitasDto } from './dto/update-citas.dto';
import { CreateCitasDto } from './dto/create-citas.dto';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { DoctoresService } from 'src/doctores/doctores.service';
@Injectable()
export class CitasService {
     constructor(
    @InjectRepository(Cita)
    private readonly citasRepo: Repository<Cita>,
    private readonly pacientesService: PacientesService,
    private readonly doctoresService: DoctoresService,
  ) {}

  findAll(): Promise<Cita[]> {
  return this.citasRepo.find({
    relations: { paciente: true, doctor: true },
    order: { fecha: 'ASC', hora: 'ASC' },
  });
}

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citasRepo.findOne({
      where: { cita_id: id },
      relations: { paciente: true, doctor: true },
    });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async create(dto: CreateCitasDto): Promise<Cita> {
    await this.pacientesService.findOne(dto.paciente_id);
    await this.doctoresService.findOne(dto.doctor_id);
    await this.verificarDisponibilidad(dto.doctor_id, dto.fecha, dto.hora);

    const cita = this.citasRepo.create({
      ...dto,
      estado: dto.estado ?? 'Pendiente',
    });
    const guardada = await this.citasRepo.save(cita);
    return this.findOne(guardada.cita_id);
  }

  async update(id: number, dto: UpdateCitasDto): Promise<Cita> {
    const cita = await this.findOne(id);

    if (dto.doctor_id || dto.fecha || dto.hora) {
      await this.verificarDisponibilidad(
        dto.doctor_id ?? cita.doctor_id,
        dto.fecha ?? cita.fecha,
        dto.hora ?? cita.hora,
        cita.cita_id,
      );
    }

    Object.assign(cita, dto);
    await this.citasRepo.save(cita);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cita = await this.findOne(id);
    await this.citasRepo.remove(cita);
  }

  private async verificarDisponibilidad(
    doctor_id: number,
    fecha: string,
    hora: string,
    citaIdExcluida?: number,
  ): Promise<void> {
    const choque = await this.citasRepo.findOne({
      where: { doctor_id, fecha, hora },
    });
    if (choque && choque.cita_id !== citaIdExcluida) {
      throw new ConflictException('El doctor ya tiene una cita en ese horario');
    }
  }
}
