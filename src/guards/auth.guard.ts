import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MWY1NzE0LTdmNmQtNDM5ZC1iZTZlLTc3OWVjOTM4YjhmMCIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjE4NDQ0ODgsImV4cCI6MTcyMTg0ODA4OH0.67MD7rJhLYMdwCyCorrhTOZc-jWHlctneTldjhse3-g"

    // const isBearer = request.headers.authorization?.split(' ')[0];

    // if (isBearer !== 'Bearer') {
    //   throw new BadRequestException('Wrong authentication method');
    // }

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret }); //{id,email,exp,iat}

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      if (user.isAdmin) {
        user.roles = ['admin'];
      } else {
        user.roles = ['user'];
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
