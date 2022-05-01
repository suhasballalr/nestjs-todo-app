import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [TaskModule,
    MongooseModule.forRoot(
      'mongodb+srv://suhasballal777:C3PWG1HEelkU6ccp@cluster0.wmqf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
