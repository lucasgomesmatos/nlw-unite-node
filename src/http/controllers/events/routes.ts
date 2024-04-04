import { FastifyInstance } from 'fastify';
import { createEvent } from './create-event';

export async function eventsRoutes(app: FastifyInstance) {
  app.post('/events', createEvent);
}
