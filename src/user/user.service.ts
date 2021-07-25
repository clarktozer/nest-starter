import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async getById(id: string) {
    return this.usersRepository.findOne({ id });
  }

  async register(userData: RegisterUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update(id: string, userData: UpdateUserDto) {
    const result = await this.usersRepository.update(id, userData);

    return result;
  }

  async getByGoogleId(id: string) {
    const user = await this.usersRepository.findOne({ googleId: id });

    return user;
  }

  async getByFacebookId(id: string) {
    const user = await this.usersRepository.findOne({ facebookId: id });

    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);

    return newUser;
  }
}
