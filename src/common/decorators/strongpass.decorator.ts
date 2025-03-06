import { Matches, MinLength } from 'class-validator';

export function IsStrongPassword(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          'Password is too weak, it must contain at least one number, one capital letter, one lowercase letter and one special character.',
      },
    )(target, propertyKey);
    MinLength(8)(target, propertyKey as string);
  };
}
