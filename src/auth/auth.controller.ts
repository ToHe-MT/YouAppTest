import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    UsePipes, 
    ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/Register.dto";
import { LoginDto } from "./dto/Login.dto";
import { Public } from "src/public.decorator";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @Post('register')
    @UsePipes(new ValidationPipe())
    @ApiCreatedResponse({type: RegisterDto, description:'Successfully created Account and User'})
    @ApiBadRequestResponse({description:'Email or Username already exist'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    register(@Body() registerDto:RegisterDto) {
        return this.authService.register(registerDto)
    }
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe())
    @ApiOkResponse({type: LoginDto, description:'Logged In'})
    @ApiBadRequestResponse({description:'Wrong Credentials'})
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    login(@Body() loginDto:LoginDto) {
        return this.authService.login(loginDto)
    }

    //FOR DEVELOPMENT PURPOSES
    // @Public()
    // @Get()
    // getAuth() {
    //     return this.authService.getAuth();
    // }
}