import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD

@Module({
  imports: [],
=======
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
>>>>>>> frank-nest
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
