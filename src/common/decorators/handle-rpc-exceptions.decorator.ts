import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export function HandleRpcExceptions() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Error to ${propertyKey}: ${error.message || error}`,
        });
      }
    };

    return descriptor;
  };
}
