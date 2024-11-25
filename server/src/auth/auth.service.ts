import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { User } from '../users/users.module';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.findOneUser({
      where: { email: userDto.email },
    });

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.createUser({
      username: userDto.username,
      password: hashedPassword,
      email: userDto.email,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findOneUser({
      where: { email: userDto.email },
    });

    const passwordValid = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordValid) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
