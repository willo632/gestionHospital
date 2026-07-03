import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { UpdateDoctoresDto } from './dto/update-doctores.dto';
import { CreateDoctoresDto } from './dto/create-doctores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctoresService {
     constructor(
    @InjectRepository(Doctor)
    private readonly doctoresRepo: Repository<Doctor>,
  ) {}

  findAll(): Promise<Doctor[]> {
    return this.doctoresRepo.find({ order: { apellido: 'ASC' } });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctoresRepo.findOne({ where: { doctor_id: id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor con id ${id} no encontrado`);
    }
    return doctor;
  }

  create(dto: CreateDoctoresDto): Promise<Doctor> {
    const doctor = this.doctoresRepo.create(dto);
    return this.doctoresRepo.save(doctor);
  }

  async update(id: number, dto: UpdateDoctoresDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    Object.assign(doctor, dto);
    return this.doctoresRepo.save(doctor);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctoresRepo.remove(doctor);
  }
}
