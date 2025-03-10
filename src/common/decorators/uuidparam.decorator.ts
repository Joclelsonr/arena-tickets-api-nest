import { HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';

export function UUIDParam(property: string): ParameterDecorator {
  return Param(
    property,
    new ParseUUIDPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => ({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'This is not a valid UUID',
      }),
    }),
  );
}
