import { Prisma } from '@prisma/client';

export interface EventRepository {
  save(event: Prisma.EventCreateInput): Promise<void>;
}
