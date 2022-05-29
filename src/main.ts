import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints)
            .join('. ')
            .trim();
        });
        return new BadRequestException(errorMessages);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,

      disableErrorMessages: false,

      validationError: {
        value: false,
      },
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Users and Books')
    .setDescription('The Users and Books API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(helmet());

  await app.listen(configuration().port);
}
bootstrap();
