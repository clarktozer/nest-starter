import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './registerUserDto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
