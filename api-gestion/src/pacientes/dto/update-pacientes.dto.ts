import { PartialType } from '@nestjs/mapped-types';
import { CreatePacientesDto } from './create-pacientes.dto';
export class UpdatePacientesDto extends PartialType(CreatePacientesDto){}
