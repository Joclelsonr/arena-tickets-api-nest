import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/strongpass.decorator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nome para o usuário da aplicação',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    type: String,
    description: 'Nome de usuário',
  })
  @IsString()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @ApiProperty({
    type: String,
    description: 'Email do usuário',
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
  })
  @IsString()
  @IsStrongPassword()
  password!: string;
}
