export class ValidationError extends Error {
    id;
    constructor(id, message) {
      super(id, message);
      this.name = 'ValidationError';
      this.message = message;
      this.id = id;
    }
  }