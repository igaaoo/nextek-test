import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async createUser(
    @Body() body: { name: string; email: string; password: string; }
  ) {
    return this.usersService.createUser(body);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
