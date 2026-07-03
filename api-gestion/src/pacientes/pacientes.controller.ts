import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePacientesDto } from './dto/create-pacientes.dto';
import { UpdatePacientesDto } from './dto/update-pacientes.dto';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePacientesDto) {
    return this.pacientesService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePacientesDto) {
    return this.pacientesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.remove(id);
  }
}
