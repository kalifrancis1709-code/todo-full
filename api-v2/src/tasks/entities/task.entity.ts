import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'La désignation est obligatoire' })
  @MaxLength(255, {
    message: 'La désignation ne peut pas dépasser 255 caractères',
  })
  designation: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  constructor(designation: string) {
    this.designation = designation;
  }
}
