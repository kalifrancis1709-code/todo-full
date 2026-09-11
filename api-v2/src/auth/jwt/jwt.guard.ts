// src/auth/jwt/jwt.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRole) {
      return super.canActivate(context) as
        boolean | Promise<boolean> | Observable<boolean>;
    }

    return super.canActivate(context) as boolean;
    // Ajoute ici ta logique de vérification de rôle si nécessaire,
    // par exemple en combinant avec RolesGuard séparément.
  }
}
