import { Module } from '@nestjs/common';
import { DoctoresController } from './doctores.controller';
import { DoctoresService } from './doctores.service';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctoresController],
  providers: [DoctoresService],
  exports: [DoctoresService],
})
export class DoctoresModule {}
