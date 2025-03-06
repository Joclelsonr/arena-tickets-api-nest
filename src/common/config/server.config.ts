import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSubscriber } from 'src/user/user.subscriber';

export const typeOrmConfig = registerAs('typeorm', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL
      ? process.env.DATABASE_URL
      : 'postgres://postgres:postgres@localhost:5432/arena-tickets',
    migrationsRun:
      'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
        ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
        : false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [UserSubscriber],
    synchronize:
      'string' === typeof process.env.DATABASE_SYNCHRONIZE
        ? process.env.DATABASE_SYNCHRONIZE === 'true'
        : true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logging: true,
    logger: 'file',
  };
});
