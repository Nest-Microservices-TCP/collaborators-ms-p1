import { IBaseRepository } from './base-repository.interface';
import { IExtendedRepository } from './extended-repository.interface';

export interface IRepository<T, CreateDto, FindOneDto>
  extends IBaseRepository<T, CreateDto, FindOneDto>,
    IExtendedRepository<T> {}
