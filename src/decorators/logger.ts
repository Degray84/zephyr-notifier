import { logger } from '../logger';

export function LogMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const { name } = this.constructor;
      try {
        const result = await originalMethod.apply(this, args);
        logger.info(`[${name}] | (${propertyKey}): success`);
        return result;
      } catch (error) {
        logger.error(`[${name}] | (${propertyKey}): error: ${error}`);
        throw error;
      }
    };

    return descriptor;
  };
}
