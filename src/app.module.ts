import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


const env = process.env;
@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: +env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      autoLoadEntities: !!env.DB_AUTOLOAD,
      entities: [],
      synchronize: false,
      //schema: 'iniciar',
    }),
    AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
