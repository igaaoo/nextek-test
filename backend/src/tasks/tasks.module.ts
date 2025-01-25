import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    CacheModule.register()
  ]
})
export class TasksModule { }
