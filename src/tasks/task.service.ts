import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks } from './task.model';
@Injectable()
export class TaskService {
  private tasks: Tasks[] = [];

  insertTasks(title: string, description: string) {
    const taskId = Math.random().toString();
    const newTask = new Tasks(taskId, title, description);
    this.tasks.push(newTask);
    return taskId;
  }

  getTasks() {
    return [...this.tasks];
  }

  getSingleTask(taskId: string) {
    const task = this.findTask(taskId)[0];
    return { ...task };
  }

  updateTask(taskId: string, title: string, description: string) {
    const [task, index] = this.findTask(taskId);
    const updateTask = { ...task };
    if (title) {
      updateTask.title = title;
    }
    if (description) {
      updateTask.description = description;
    }
    this.tasks[index] = updateTask;
  }
  deleteTask(taskId: string) {
    const index = this.findTask(taskId)[1];
    this.tasks.splice(index, 1);
  }
  private findTask(id: string): [Tasks, number] {
    const taskIndex = this.tasks.findIndex((task) => {
      task.id === id;
    });
    const task = this.tasks[taskIndex];
    if (!task) {
      throw new NotFoundException('could not find task');
    }
    return [task, taskIndex];
  }
}
