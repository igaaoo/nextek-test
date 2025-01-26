import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: { name: string; email: string; password: string; }): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findFirst({
      where: { email }
    });
  }

  async getUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
}
