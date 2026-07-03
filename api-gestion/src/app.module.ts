import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { DoctoresModule } from './doctores/doctores.module';
import { CitasModule } from './citas/citas.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'hospital',
    autoLoadEntities: true,
     synchronize: false,
  }),PacientesModule, DoctoresModule, CitasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
