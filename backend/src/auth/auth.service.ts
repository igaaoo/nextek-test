import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === password) {
      return { id: user.id, email: user.email, name: user.name };
    }

    this.logger.warn(`Failed login attempt for ${email}`);
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    this.logger.log(`User ${user.email} logged in`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
