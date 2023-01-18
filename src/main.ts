import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  //TODO ESTO ES PARA LAS LLAVES DE SSL
  //const crPath= './'
  //const pkPath='./'
  const option: any = {};
  //  if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
  //   // cargamos los archivos sobre las options
  //   option.httpsOptions = {
  //     cert: fs.readFileSync(crPath),
  //     key: fs.readFileSync(pkPath),
  //   };
  // }

  const app = await NestFactory.create(AppModule);
  //TODO esta es para el ssl
  const apps = await NestFactory.create(AppModule, option);
  app.setGlobalPrefix('des');
  apps.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('api_crd')
    .setDescription(
      'API para registro',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const documents = SwaggerModule.createDocument(apps, options);
  SwaggerModule.setup('des', app, document);
  SwaggerModule.setup('api', apps, documents);

  app.enableCors({
    origin: '*',
    credentials: false,
  });

  apps.enableCors({
    origin: '*',
    credentials: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );

  apps.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //await app.listen(3400);
 // await apps.listen(4362);
  await app.listen(3000);
}
bootstrap();
