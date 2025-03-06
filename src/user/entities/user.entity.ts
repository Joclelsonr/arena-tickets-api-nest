import { Column, Entity, Unique } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'citext', nullable: false })
  username!: string;

  @Column({ type: 'citext', nullable: false })
  password!: string;

  @Column({ type: 'citext', nullable: true })
  firstName: string;

  @Column({ type: 'citext', nullable: true })
  lastName: string;

  @Column({ type: 'citext' })
  email: string;

  @Column({ type: 'citext', nullable: true, default: null })
  salt: string;

  @Column({ default: true, nullable: false })
  active: boolean;

  // @OneToMany(() => UserRole, userRole => userRole.user)
  // userRoles?: UserRole[];

  createdAt: Date;
  updatedAt: Date;
}
