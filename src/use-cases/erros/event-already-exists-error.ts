export class EventAlreadyExistsError extends Error {
  constructor() {
    super('Another event with the same title already exists.');
  }
}
