import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почта' })
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ example: '1234', description: 'Пароль' })
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsNotEmpty()
  readonly username: string;
}
