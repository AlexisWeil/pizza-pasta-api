import { BadRequest, Exception, Result } from 'global/api';
import { ZodType } from 'zod';

export const validate =
  <T>(shape: ZodType<T>) =>
  (data: T) =>
  (ifValid: (data: T) => Promise<Result>): Promise<Result> => {
    const valid = shape.safeParse(data);

    if (!valid.success) {
      const formattedErrors = valid.error.format();

      const errorFields =
        Object.keys(formattedErrors)
          .filter((k) => k !== '_errors');

      const exceptions = errorFields.flatMap((field) =>
        (formattedErrors as any)[field]['_errors'].map((error: string) =>
          Exception(field, error)
        )
      );

      return Promise.resolve(BadRequest(exceptions));
    } else {
      return ifValid(valid.data);
    }
  };