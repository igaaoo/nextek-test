import { Controller, Post, Body, Get, Put, Delete, Param, Query, UseGuards, Request, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { tasks } from '@prisma/client';
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
    @Query('page', ParseIntPipe) page: number = 1, // Padrão: página 1
    @Query('limit', ParseIntPipe) limit: number = 10 // Padrão: 10 itens por página
  ) {
    const userId = req.user.sub;
    return this.tasksService.getTasks(userId, page, limit);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<tasks>,
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
