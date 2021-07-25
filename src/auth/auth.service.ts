import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  public async register(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      return this.usersService.create({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
  }
}
