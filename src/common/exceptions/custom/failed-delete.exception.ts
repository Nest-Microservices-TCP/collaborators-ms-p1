import { InternalServerErrorException } from '@nestjs/common';

export class FailedDeleteException extends InternalServerErrorException {
  constructor(entityName: string) {
    super(`Error to delete the ${entityName}, try again`);
  }
}
