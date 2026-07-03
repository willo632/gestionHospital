import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DoctoresService } from './doctores.service';
import { CreateDoctoresDto } from './dto/create-doctores.dto';
import { UpdateDoctoresDto } from './dto/update-doctores.dto';

@Controller('doctores')
export class DoctoresController {
    constructor(private readonly doctoresService: DoctoresService) {}

  @Get()
  findAll() {
    return this.doctoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctoresService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDoctoresDto) {
    return this.doctoresService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDoctoresDto) {
    return this.doctoresService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctoresService.remove(id);
  }
}
