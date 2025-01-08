import { IBaseRepository } from './base-repository.interface';
import { IExtendedRepository } from './extended-repository.interface';

export interface IRepository<T, CreateDto, UpdateDto>
  extends IBaseRepository<T, CreateDto, UpdateDto>,
    IExtendedRepository<T> {}
