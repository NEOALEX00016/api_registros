import { IsString } from "class-validator";

export class RegisterDto{

  @IsString()
  nombre:string;

  @IsString()
  apellido:string;

  @IsString()
  usuario:string;

  @IsString()
  constrasena:string;

  @IsString()
  estado:string;

  
  


}