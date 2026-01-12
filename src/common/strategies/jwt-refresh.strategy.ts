/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
  true, // 👈 request-based
) {
  constructor() {
    super({
      jwtFromRequest: (req: any) => req?.cookies?.refreshToken,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
    });
  }

  validate(req: any, payload: any) {
    return payload; // usually { sub, role }
  }
}
