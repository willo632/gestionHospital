import { PartialType } from "@nestjs/mapped-types";
import { CreateDoctoresDto } from "./create-doctores.dto";

export class UpdateDoctoresDto  extends PartialType(CreateDoctoresDto) {}
