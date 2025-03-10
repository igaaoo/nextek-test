import { Controller, Post, Body, Get, Put, Delete, Param, Query, UseGuards, Request, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Post()
  async createTask(
    @Body() body: { title: string; description: string; },
    @Request() req
  ) {
    const userId = req.user.sub;
    return this.tasksService.createTask({ ...body, user_id: userId });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getTasks(
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.tasksService.getTasks(userId);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Tasks>,
    @Request() req
  ) {
    const userId = req.user.sub;
    return this.tasksService.updateTask(id, body, userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.sub;
    return this.tasksService.deleteTask(id, userId);
  }
}
