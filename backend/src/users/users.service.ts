import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: { name: string; email: string; password: string; }): Promise<users> {
    return this.prisma.users.create({ data });
  }

  async findUserByEmail(email: string): Promise<users | null> {
    return this.prisma.users.findFirst({
      where: { email }
    });
  }

  async getUsers(): Promise<users[]> {
    return this.prisma.users.findMany();
  }
}
