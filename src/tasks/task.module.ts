import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './task.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'task', schema: taskSchema }])],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TaskModule {}
