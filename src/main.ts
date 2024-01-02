import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/setup-swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT || 3001, '0.0.0.0', ()=>{
    console.log("Listening on PORT", process.env.PORT )
  });
}
bootstrap();
