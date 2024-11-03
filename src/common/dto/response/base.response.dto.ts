import { Status } from '../enums';

export abstract class BaseResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date;
  status: Status;
}
