import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      return 'User not found';
    }

    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async addUser(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);

    const { password, isAdmin, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async updateUser(id: string, user: Partial<Users>) {
    await this.usersRepository.update(id, user);

    const updatedUser = await this.usersRepository.findOneBy({ id });

    const { password, isAdmin, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    this.usersRepository.remove(user);

    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }
}
