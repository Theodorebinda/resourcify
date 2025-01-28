import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: ["http://localhost:3001"],
    methods: "GET,HEAD,POST,PATCH,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
