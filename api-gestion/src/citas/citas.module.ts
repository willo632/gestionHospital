import { Module } from '@nestjs/common';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { DoctoresModule } from 'src/doctores/doctores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cita]), PacientesModule, DoctoresModule],
  controllers: [CitasController],
  providers: [CitasService]
})
export class CitasModule {}
