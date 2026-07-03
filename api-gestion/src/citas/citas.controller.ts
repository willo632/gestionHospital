import {
    Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitasDto } from './dto/create-citas.dto';
import { UpdateCitasDto } from './dto/update-citas.dto';

@Controller('citas')
export class CitasController {
     constructor(private readonly citasService: CitasService) {}

  @Get()
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCitasDto) {
    return this.citasService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCitasDto) {
    return this.citasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.remove(id);
  }
}
