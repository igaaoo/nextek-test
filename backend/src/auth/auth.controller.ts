import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'igor@gmail.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        }
      }
    }
  )
  async login(@Body() body: { email: string; password: string; }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
