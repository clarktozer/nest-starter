import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  password: string;

  @Column({
    nullable: true,
    unique: true,
    name: 'google_id',
  })
  @Exclude()
  googleId: string;

  @Column({
    nullable: true,
    unique: true,
    name: 'facebook_id',
  })
  @Exclude()
  facebookId: string;

  @Column({
    default: false,
    name: 'is_admin',
  })
  isAdmin: boolean;
}
