import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
<<<<<<< HEAD

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  findAll() {
    return this.taskRepository.find();
>>>>>>> main
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
<<<<<<< HEAD
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
=======
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
>>>>>>> main
  }
}
