import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { RegisterUserDto } from '../user/dto/registerUserDto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  public async register(user: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      const newUser = await this.usersService.register({
        ...user,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async validateUser(email: string, plainTextPassword: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    await this.verifyPassword(plainTextPassword, user.password);

    return user;
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

  public async signInWithGoogle(data: CreateUserDto) {
    if (!data) {
      throw new BadRequestException();
    }

    let user = await this.usersService.getByGoogleId(data.googleId);
    if (user) {
      return user;
    }

    user = await this.usersService.getByEmail(data.email);
    if (user) {
      throw new ForbiddenException(
        'User already exists but Google account was not connected to user account',
      );
    }

    return this.usersService.create(data);
  }
}
