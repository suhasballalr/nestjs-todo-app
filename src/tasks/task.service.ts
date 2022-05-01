import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './task.model';
import { Model } from 'mongoose';
@Injectable()
export class TaskService {
  constructor(@InjectModel('task') private readonly taskModel: Model<Tasks>) {}
  private tasks: Tasks[] = [];

  async insertTasks(title: string, desc: string) {
    const newTask = new this.taskModel({ title, description: desc });
    const result = await newTask.save();
    return result.id as string;
  }

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
    }));
  }

  async getSingleTask(taskId: string) {
    const product = await this.findTask(taskId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
    };
  }

  async updateTask(taskId: string, title: string, description: string) {
    const updatedProduct = await this.findTask(taskId);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    updatedProduct.save();
  }

  async deleteTask(taskId: string) {
    const result: any = await this.taskModel.deleteOne({ _id: taskId }).exec();
    if (result?.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findTask(id: string): Promise<Tasks> {
    let task;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task.');
    }
    if (!task) {
      throw new NotFoundException('Could not find task.');
    }
    return task;
  }
}
