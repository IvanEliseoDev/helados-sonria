import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let authToken = null;
                    if (req && req.cookies) {
                        authToken = req.cookies['access_cookie']
                    }
                    return authToken
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'helados_sonrisa_secret_key_0110101',
        })
    };

    async validate(payload: {id:string, email:String, role: string}) {
        if(!payload) throw new UnauthorizedException()
        return {userId: payload.id, email: payload.email, role:payload.role}
    }

}