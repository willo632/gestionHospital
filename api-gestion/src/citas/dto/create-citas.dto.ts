import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import type { EstadoCita } from "../entities/cita.entity";

export class CreateCitasDto {
    @IsInt()
    paciente_id!: number;

  @IsInt()
    doctor_id!: number;

  @IsDateString()
    fecha!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'hora debe tener el formato HH:mm',
    })
    hora!: string;

  @IsString()
    @IsNotEmpty()
    motivo!: string;

  @IsOptional()
  @IsIn(['Pendiente', 'Confirmada', 'Cancelada', 'Completada'])
  estado?: EstadoCita;
}
