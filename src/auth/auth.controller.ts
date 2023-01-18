import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerdto';
import { LoginDto } from './dto/logindto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerdto: RegisterDto) {
    return this.authService.create(registerdto);
  }


  @Post('login')
  login(@Body() logindto:LoginDto){
    return this.authService.login(logindto);

  }


}
