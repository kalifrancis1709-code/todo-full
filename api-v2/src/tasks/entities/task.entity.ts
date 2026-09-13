import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
  @Column({ default: 'user' })
  role: string;
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
  nom?: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(designation: string, nom?: string) {
    this.designation = designation;
    this.nom = nom;
  }
}
