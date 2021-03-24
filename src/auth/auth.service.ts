import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService
      ,private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
          // const { password, ...result } = user;
          // return result;
          return user
        }
        return null;
      }

      async login(user: any) {
        const payload = { email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
