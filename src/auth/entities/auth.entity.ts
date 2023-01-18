import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuarios {

   @PrimaryGeneratedColumn()
   id:number;
   
   @Column()
   nombre:string;

   @Column()
   apellido:string;
   @Column()
   usuario:string;
   @Column()
   constrasena:string; 
   
   @Column({default:'Activo'})
   estado:string;




}
