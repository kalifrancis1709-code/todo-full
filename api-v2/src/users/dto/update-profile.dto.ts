import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  prenom?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;
}
