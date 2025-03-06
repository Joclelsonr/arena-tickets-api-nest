import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private db: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = this.db.create(createUserDto);
      const savedUser = await this.db.save(user);
      return plainToInstance(UserDto, savedUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error trying to create a user');
    }
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.db.find();
    return plainToInstance(UserDto, users);
  }

  public async findById(id: string): Promise<UserDto> {
    const user = await this.db.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async findOne(id: string): Promise<UserDto> {
    const user = await this.findById(id);
    return plainToInstance(UserDto, user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.findById(id);
    const newUser: User = {
      ...user,
      ...updateUserDto,
    };
    await this.db.save(newUser);
    return plainToInstance(UserDto, newUser);
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.db.remove(user);
  }
}
