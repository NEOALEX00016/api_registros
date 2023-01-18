import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerdto';
import { Usuarios } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/logindto';


@Injectable()
export class AuthService {

constructor(
  @InjectRepository(Usuarios)
  private readonly usuario:Repository<Usuarios>
){}

  async create(registerdto: RegisterDto) {
    try{

      const {constrasena, ...userdata}=registerdto;
      const user =this.usuario.create({
        ...userdata,
        constrasena: bcrypt.hashSync(constrasena, 10),
  
      })
  
      await this.usuario.save(user);
      delete user.constrasena
      
   
  
  
      return user;
    }  catch (error) {
     throw new BadRequestException('Error Creando el Usuario')
    }
   
  }


  async login(logindto:LoginDto){

const {constrasena, usuario}=logindto;

const user= await this.usuario.findOne({
  where:{usuario},select:{usuario:true, constrasena:true,id:true,estado:true}});

  
  if(!user)
  throw new UnauthorizedException('Usuario o Contrasena Invalido');

  if(!bcrypt.compareSync(constrasena,user.constrasena))
  throw new UnauthorizedException('Usuario o Contrasena Invalido');

  if(user.estado==="Inactivo")
  throw new UnauthorizedException('Usuario Inactivo');


  delete user.constrasena;


return user;

  }





 
}
