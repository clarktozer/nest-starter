import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this email does not exist');
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ id });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this id does not exist');
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update(id: string, userData: UpdateUserDto) {
    const result = await this.usersRepository.update(id, userData);

    return result;
  }
}
