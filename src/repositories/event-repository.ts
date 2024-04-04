import { Event, Prisma } from '@prisma/client';

export interface EventRepository {
  save(event: Prisma.EventCreateInput): Promise<void>;

  findBySlug(slug: string): Promise<Event | null>;
}
