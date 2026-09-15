import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
// import { RolesGuard } from '../auth/jwt/roles.guard';
// import { Roles } from '../auth/jwt/roles.decorator';

@UseGuards(JwtGuard) // ← seulement JwtGuard
// @Roles('admin', 'user')
@Controller('taches')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: { id: number; email: string },
  ) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: { id: number; email: string }) {
    return this.tasksService.findByUser(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(+id);
  }
}
