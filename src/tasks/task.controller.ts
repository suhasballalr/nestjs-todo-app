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
    const generateId = await this.taskservice.insertTasks(taskTitle, taskDescription);
    return { id: generateId };
  }


  @Get()
  async getallTasks() {
    const products = await this.taskservice.getTasks();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.taskservice.getSingleTask(prodId);
  }


  @Patch(':id')
  async updateTask(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    await this.taskservice.updateTask(prodId, prodTitle, prodDesc);
    return null;
  }
 


  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
      await this.taskservice.deleteTask(prodId);
      return null;
  }

}
