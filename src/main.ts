import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { validationPipe } from './middlewares/validation.pipe';

const PORT = 3001;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe);

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`Starting listening at port ${3001}🚀`);
}
bootstrap();
