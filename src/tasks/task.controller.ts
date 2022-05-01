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
  async addTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
  ) {
    const generateId = await this.taskservice.insertTasks(
      taskTitle,
      taskDescription,
    );
    return { id: generateId };
  }

  @Get()
  async getallTasks() {
    const products = await this.taskservice.getTasks();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') taskId: string) {
    return this.taskservice.getSingleTask(taskId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    await this.taskservice.updateTask(taskId, prodTitle, prodDesc);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') taskId: string) {
    await this.taskservice.deleteTask(taskId);
    return null;
  }
}
