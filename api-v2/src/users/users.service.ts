import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // ---- Nouvelles méthodes pour l'espace profil ----

  private toSafeUser(user: User) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return this.toSafeUser(user);
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.prenom !== undefined) user.prenom = dto.prenom;
    if (dto.email !== undefined) user.email = dto.email;

    const saved = await this.usersRepository.save(user);
    return this.toSafeUser(saved);
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const isValid = await bcrypt.compare(dto.ancienMotDePasse, user.password);
    if (!isValid) {
      throw new UnauthorizedException("L'ancien mot de passe est incorrect");
    }

    user.password = await bcrypt.hash(dto.nouveauMotDePasse, 12);
    await this.usersRepository.save(user);

    return { message: 'Mot de passe modifié avec succès' };
  }

  async updatePhoto(id: number, photoUrl: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    user.photoUrl = photoUrl;
    const saved = await this.usersRepository.save(user);
    return this.toSafeUser(saved);
  }
}
