import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "src/schemas/Auth.schema";
import { RegisterDto } from "./dto/Register.dto";
import { LoginDto } from "./dto/Login.dto";
import { User } from "src/schemas/User.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'

@Injectable({})

export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel("Auth") private authModel: Model<Auth>,
        @InjectModel("User") private userModel: Model<User>
    ) { }


    async register(registerDto: RegisterDto) {
        try {
            const userBody = { username: registerDto.username }
            const newUser = new this.userModel(userBody)
            await newUser.save()

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(registerDto.password, salt)
            const registerBody = {
                email: registerDto.email,
                username: registerDto.username,
                password: hash,
                user: newUser.id
            }
            const newAuth = new this.authModel(registerBody);
            await newAuth.save()

            const payload = { sub: newUser.id, username: newAuth.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                const duplicatedValue = err.keyPattern.email;
                throw new HttpException(`Duplicate value: ${duplicatedValue}. Registration failed.`, HttpStatus.CONFLICT);
            }
            throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginDto: LoginDto): Promise<any> {
        let user;
        if (loginDto.username) {
            user = await this.getAuthByUsername(loginDto.username);
        }
        if (loginDto.email) {
            user = await this.getAuthByEmail(loginDto.email);
        }
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(loginDto.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException("Wrong Credentials");
            }
            const payload = { sub: user.user._id, username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new UnauthorizedException("Wrong Credentials");
        }
    }

    getAuth() {
        return this.authModel.find();
    }
    async getAuthByUsername(username: string) {
        return this.authModel.findOne({ username: username });
    }

    async getAuthByEmail(email: string) {
        return await this.authModel.findOne({ email: email }).exec();
    }
    async verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (error) {
            throw new Error('Token verification failed');
        }
    }
}