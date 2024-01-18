/* eslint-disable @typescript-eslint/no-explicit-any */
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import {
  // NextFunction,
  Request
} from 'express';
import { ObjectSchema } from 'joi';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function <T>(...args: T[]) {
      const req: Request = args[0] as Request;
      // const next: NextFunction = args[2] as NextFunction;
      // const res: Response = args[1] as Response;
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
        // return next(new JoiRequestValidationError(error.details[0].message));
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
