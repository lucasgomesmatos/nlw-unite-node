import { PrismaEventRepository } from '@/repositories/prisma/prisma-event-repository';
import { CreateEventUseCase } from '../create-event';

export function makeCreateEventUseCase() {
  const eventRepository = new PrismaEventRepository();
  const createEventUseCase = new CreateEventUseCase(eventRepository);

  return createEventUseCase;
}
