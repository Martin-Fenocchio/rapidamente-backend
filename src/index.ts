import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { configure } from '@vendia/serverless-express';

let cachedServer: ReturnType<typeof configure> | undefined;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://martin-fenocchio.github.io',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    // importante: agregar esta línea para permitir cookies (si en algún momento las usás)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }

    next();
  });

  await app.init();
  return configure({ app: expressApp });
}

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context);
};
