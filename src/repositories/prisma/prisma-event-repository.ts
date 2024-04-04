import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { EventRepository } from '../event-repository';

export class PrismaEventRepository implements EventRepository {
  async save(event: Prisma.EventCreateInput) {
    await prisma.event.create({
      data: {
        title: event.title,
        details: event.details,
        maximumAttendees: event.maximumAttendees,
        slug: event.slug,
      },
    });
  }
}
