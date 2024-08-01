import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFunc } from './middlewares/loggerFunc.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import {cors} from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PI Cohorte 51')
    .setDescription('This is the final project from Henry')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(loggerFunc);
  // app.use(cors)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
