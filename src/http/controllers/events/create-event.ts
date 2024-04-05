import { EventAlreadyExistsError } from '@/use-cases/erros/event-already-exists-error';
import { makeCreateEventUseCase } from '@/use-cases/factories/make-create-event-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const eventBodySchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const { title, details, maximumAttendees } = eventBodySchema.parse(
    request.body,
  );

  try {
    const createEventUseCase = makeCreateEventUseCase();

    await createEventUseCase.execute({
      title,
      details,
      maximumAttendees,
    });
  } catch (error: unknown) {
    if (error instanceof EventAlreadyExistsError) {
      reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }

  reply.status(201).send();
}
