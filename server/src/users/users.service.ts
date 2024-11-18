import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  findOneUser(filter: {
    where: { id?: string; username?: string; email?: string };
  }) {
    const user = this.userRepository.findOne({ ...filter });
    return user;
  }

  async createUser(
    dto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();

    const existingByEmail = await this.findOneUser({
      where: { email: dto.email },
    });

    if (existingByEmail) {
      return { warningMessage: 'Пользователя с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    user.username = dto.username;
    user.password = hashedPassword;
    user.email = dto.email;

    return user.save();
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
