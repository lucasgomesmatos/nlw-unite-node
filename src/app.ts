import cors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { env } from './env/environment';
import { eventsRoutes } from './http/controllers/events/routes';

export const app = fastify();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.register(eventsRoutes);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);

    reply.status(400).send({
      message: 'Validation error',
      issues: validationError,
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: send error to external tool Sentry/Datadog/New Relic
  }

  console.error(error);

  reply.status(500).send({
    message: 'Internal server error',
  });
});
