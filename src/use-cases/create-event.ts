import { EventRepository } from '@/repositories/event-repository';
import { generateSlug } from '@/utils/generate-slug';

interface CreateEventRequest {
  title: string;
  details: string | null;
  maximumAttendees: number | null;
}

export class CreateEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async execute({
    title,
    details,
    maximumAttendees,
  }: CreateEventRequest): Promise<void> {
    const event = {
      title,
      details,
      maximumAttendees,
      slug: generateSlug(title),
    };

    await this.eventRepository.save(event);
  }
}
