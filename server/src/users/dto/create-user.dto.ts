import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password: string;
}
