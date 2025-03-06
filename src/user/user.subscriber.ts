import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  FindOperator,
  InsertEvent,
  Not,
  UpdateEvent,
} from 'typeorm';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { CryptUtils } from 'src/common/utils/crypt.utils';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await this._checkEmailUniqueness(event);
    await this._hashInsertedPassword(event);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    await this._checkEmailUniqueness(event);
    await this._hashUpdatedPassword(event);
  }

  async _hashPassword(user: User) {
    user.salt = await CryptUtils.generateSalt();
    user.password = await CryptUtils.hashPassword(user.password, user.salt);
  }

  async _hashUpdatedPassword(event: UpdateEvent<User>) {
    const user = event.entity as User;
    const currentRecord = await event.manager.findOne(User, {
      where: {
        id: user.id,
      },
    });
    if (
      currentRecord?.password &&
      user.password &&
      user.password !== currentRecord.password
    ) {
      await this._hashPassword(user);
    }
    return;
  }

  async _hashInsertedPassword(event: InsertEvent<User>) {
    const user = event.entity;
    await this._hashPassword(user);
    return;
  }

  async _checkEmailUniqueness(event: InsertEvent<User> | UpdateEvent<User>) {
    const user = event.entity;

    if (user?.email) {
      const criteria: {
        where: {
          id?: FindOperator<string>;
          email: FindOperator<string>;
        };
      } = {
        where: {
          email: Equal(user.email),
        },
      };
      if (user.id) {
        criteria.where.id = Not(user.id);
      }

      const count = await event.manager.count(User, criteria);
      if (count > 0) {
        throw new BadRequestException('Email address already exists.');
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
