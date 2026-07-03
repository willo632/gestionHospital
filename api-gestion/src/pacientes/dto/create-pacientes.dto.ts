import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreatePacientesDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

  @IsString()
    @IsNotEmpty()
    apellido!: string;

  @IsDateString()
    fecha_nacimiento!: string;

  @IsString()
    @IsNotEmpty()
    telefono!: string;
}
