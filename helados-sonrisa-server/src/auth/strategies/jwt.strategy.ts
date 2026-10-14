import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvConfig } from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<EnvConfig, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const rawCookie = req.headers.cookie ?? '';
          const cookieBag: Record<string, string> = {};

          for (const pair of rawCookie.split(';')) {
            const trimmedPair = pair.trim();
            if (!trimmedPair) continue;

            const separatorIndex = trimmedPair.indexOf('=');
            const key =
              separatorIndex >= 0
                ? trimmedPair.slice(0, separatorIndex).trim()
                : trimmedPair;
            const value =
              separatorIndex >= 0
                ? trimmedPair.slice(separatorIndex + 1).trim()
                : '';

            cookieBag[key] = value;
          }

          const cookieValue = cookieBag['access_cookie'];
          return typeof cookieValue === 'string' ? cookieValue : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: String(configService.getOrThrow('JWT_SECRET')),
    });
  }

  validate(payload: { id: string; email: string; role: string }) {
    if (!payload) throw new UnauthorizedException();
    return { userId: payload.id, email: payload.email, role: payload.role };
  }
}
