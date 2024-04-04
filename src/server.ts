import { app } from './app';
import { env } from './env/environment';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then((address) => {
    console.log(`🔥 HTTP Server Running! ${address}`);
  });
