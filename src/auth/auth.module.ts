import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSchema } from "src/schemas/Auth.schema";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./guards/constants";
import { User, UserSchema } from "src/schemas/User.schema";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Auth",
                schema: AuthSchema,
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '300s' }
        })
    ]
    ,
    controllers: [AuthController],
    providers: [
        AuthService
    ]
})

export class AuthModule { }