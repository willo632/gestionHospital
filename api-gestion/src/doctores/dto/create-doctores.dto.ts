import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctoresDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

  @IsString()
    @IsNotEmpty()
    apellido!: string;

  @IsString()
    @IsNotEmpty()
    especialidad!: string;

  @IsString()
    @IsNotEmpty()
    telefono!: string;
}
