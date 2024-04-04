import { EventRepository } from '@/repositories/event-repository';
import { generateSlug } from '@/utils/generate-slug';
import { EventAlreadyExistsError } from './erros/event-already-exists-error';

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
    const slug = generateSlug(title);

    const eventExists = await this.eventRepository.findBySlug(slug);

    if (eventExists) {
      throw new EventAlreadyExistsError();
    }

    const event = {
      title,
      details,
      maximumAttendees,
      slug,
    };

    await this.eventRepository.save(event);
  }
}
