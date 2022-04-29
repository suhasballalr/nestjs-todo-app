import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskservice: TaskService) {}

  @Post()
  addTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
  ) {
    const generateId = this.taskservice.insertTasks(taskTitle, taskDescription);
    return { id: generateId };
  }

  @Get()
  getallTasks() {
    return this.taskservice.getTasks();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.taskservice.getSingleTask(prodId);
  }

  @Patch(':id')
  updateTask(
    @Body('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
  ) {
    this.taskservice.updateTask(taskId, taskTitle, taskDescription);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.taskservice.deleteTask(prodId);
    return null;
  }
}
