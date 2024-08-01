import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import * as brypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // inyecto el servicio
  ) {}

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    const foundUser = await this.usersService.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already registered');
    }

    const hashedPassword = await brypt.hash(password, 10); // oajdshfg234tdwfvwdfg@!#4sdfgswdaefh

    if (!hashedPassword) {
      throw new BadRequestException('Encription error');
    }

    return await this.usersService.addUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.usersService.getUserByEmail(email);

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }
    // string original     // version encriptada
    const isPasswordValid = await brypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const userPayload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin, //false si no es admin y true si es admin
    };

    const token = this.jwtService.sign(userPayload); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MWY1NzE0LTdmNmQtNDM5ZC1iZTZlLTc3OWVjOTM4YjhmMCIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjE4NDQ0ODgsImV4cCI6MTcyMTg0ODA4OH0.67MD7rJhLYMdwCyCorrhTOZc-jWHlctneTldjhse3-g

    return {
      message: 'User logged in succesfully',
      token,
    };
  }
}
