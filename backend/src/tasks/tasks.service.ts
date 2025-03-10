import { Injectable, ForbiddenException, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import { Tasks } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache
  ) { }

  public async clearCache() {
    this.logger.log(`Clearing cache`);
    await this.cacheManager.clear();
  }

  async createTask(data: { title: string; description: string; user_id: number; }): Promise<Tasks> {
    this.logger.log(`Task created for user_id: ${data.user_id} | Title: "${data.title}"`);
    const task = await this.prisma.tasks.create({
      data,
    });

    this.logger.log(`Clearing cache after creating task for user_id: ${data.user_id}`);
    await this.cacheManager.clear();

    return task;
  }

  async getTasks(user_id: number): Promise<any> {
    const cacheKey = `tasks:${user_id}`;

    const cachedTasks = await this.cacheManager.get(cacheKey);
    if (cachedTasks) {
      return cachedTasks;
    }


    this.logger.log(`Fetching tasks for user_id: ${user_id}`);
    const tasks = await this.prisma.tasks.findMany({
      where: { user_id },
    });

    const result = {
      tasks
    };

    await this.cacheManager.set(cacheKey, result, 300);

    return result;
  }

  async updateTask(id: number, data: Partial<Tasks>, user_id: number): Promise<Tasks> {
    const task = await this.prisma.tasks.findUnique({
      where: { id },
    });

    if (!task || task.user_id !== user_id) {
      this.logger.warn(`Unauthorized update attempt for task_id: ${id} by user_id: ${user_id}`);
      throw new ForbiddenException('You are not allowed to update this task');
    }

    this.logger.log(`Task with id: ${id} updated by user_id: ${user_id}`);
    const updatedTask = await this.prisma.tasks.update({
      where: { id },
      data,
    });

    this.logger.log(`Clearing cache after updating task with id: ${id}`);
    await this.cacheManager.clear();

    return updatedTask;
  }

  async deleteTask(id: number, user_id: number): Promise<Tasks> {
    const task = await this.prisma.tasks.findUnique({
      where: { id },
    });

    if (!task || task.user_id !== user_id) {
      this.logger.warn(`Unauthorized delete attempt for task_id: ${id} by user_id: ${user_id}`);
      throw new ForbiddenException('You are not allowed to delete this task');
    }

    this.logger.log(`Task with id: ${id} deleted by user_id: ${user_id}`);
    await this.prisma.tasks.delete({
      where: { id },
    });

    this.logger.log(`Clearing cache after deleting task with id: ${id}`);
    await this.cacheManager.clear();

    return task;
  }
}
