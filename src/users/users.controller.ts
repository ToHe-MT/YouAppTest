import { Body, Controller, Delete, ExecutionContext, Get, Headers, HttpException, Param, Patch, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/guards/constants';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('JWT')
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    //COMMENTED ROUTES ARE FOR DEVELOPMENT ONLY

    // @Post()
    // @UsePipes(new ValidationPipe())
    // createUser() {
    //     return "Profile/User automatically created after Register/SignUp"
    // }

    // @Get()
    // getUsers() {
    //     return this.usersService.getUsers();
    // }

    @Get('getProfile')
    @ApiOkResponse({ description: 'Profile has been found' })
    async getUserById(@Request() req: any) {
        const authorizationHeader = req.headers['authorization'];
        const token = this.getToken(authorizationHeader)
        if (!token) {
            throw new UnauthorizedException('TokenNotProvided');
        }
        const decodedToken: any = this.jwtService.verify(token, { secret: jwtConstants.secret })
        const id = decodedToken.sub;
        console.log(id)
        const isValid = (mongoose.Types.ObjectId.isValid(id));
        if (!isValid) throw new HttpException("Invalid ID", 404)
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException("User Not Found", 404)
        return findUser;
    }

    @Patch('updateProfile')
    @ApiOkResponse({ type: UpdateUserDto, description: 'Profile has been Updated' })
    @UsePipes(new ValidationPipe())
    async updateUser(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
        const authorizationHeader = req.headers['authorization'];
        const token = this.getToken(authorizationHeader)
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }
        const decodedToken: any = this.jwtService.verify(token, { secret: jwtConstants.secret })
        const id = decodedToken.sub;

        const isValid = (mongoose.Types.ObjectId.isValid(id));
        if (!isValid) throw new HttpException("Invalid ID", 404);
        const updatedUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updatedUser) throw new HttpException('User Not Found', 404);
        return updatedUser;
    }

    // @Delete('deleteProfile.:id')
    // async deleteUser(@Param('id') id: string) {
    //     const isValid = (mongoose.Types.ObjectId.isValid(id));
    //     if (!isValid) throw new HttpException("Invalid ID", 404);
    //     const deletedUser = await this.usersService.deleteUser(id);
    //     if (!deletedUser) throw new HttpException("User Not Found", 404);
    //     return "User Deleted";
    // };
    private getToken(authorizationHeader:any){
        if (authorizationHeader) {
            const [type, token] = authorizationHeader.split(' ');

            if (type === 'Bearer' && token) {
                return token;
            }
        }
    }
}

