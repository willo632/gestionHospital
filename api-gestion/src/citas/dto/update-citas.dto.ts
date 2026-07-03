import { PartialType } from "@nestjs/mapped-types";
import { CreateCitasDto } from "./create-citas.dto";

export class UpdateCitasDto extends PartialType(CreateCitasDto){}
