type Dictionary<T> = { [key: string]: T };

export type IValidator<T> = (value: any) => value is T;
type IExtensionValidator<A, B extends A> = (value: A) => value is B;
type IValidatorMap<T extends object> = {[K in keyof T]: IValidator<T[K]> };

export function isShape<T extends object>(validators: IValidatorMap<T>): IValidator<T> {
  return (value: any): value is T => {
    if(!(value && typeof value === 'object')) {
      return false;
    }
    
    for(const key in validators) {
      if(!validators[key](value[key])) {
        return false;
      }
    }

    return true;
  };
}

export function isExtension<A extends object, B extends A>(validators: IValidatorMap<Omit<B, keyof A>>): IExtensionValidator<A, B> {
  return (value: any): value is B => {
    for(const key in validators) {
      if(!validators[key](value[key])) {
        return false;
      }
    }

    return true;
  }
}

export function equals<T>(expected: T): IValidator<T> {
  return (value: any): value is T => value === expected;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

const uuidRegexp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/;
export function isUUID(value: any): value is string {
  return typeof value === 'string' && uuidRegexp.test(value);
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && value !== NaN;
}

type IV<T> = IValidator<T>;
export function isEither<A, B>(va: IV<A>, vb: IV<B>): IV<A | B>;
export function isEither<A, B, C>(va: IV<A>, vb: IV<B>, vc: IV<C>): IV<A | B | C>;
export function isEither<T>(...validators: Array<IV<any>>): IV<T> {
  return (value: any): value is T => {
    for(const validator of validators) {
      if(validator(value)) {
        return true;
      }
    }

    return false;
  };
}

export function isOptional<T>(validator: IValidator<T>): IValidator<T | null> {
  return (value): value is T | null => value === null || validator(value);
}

type IEV<A, B extends A> = (value: A) => value is B;
export function isEvery<A, B extends A>(va: IV<A>, vb: IEV<A, B>): IV<B>;
export function isEvery<A, B extends A, C extends B>(va: IV<A>, vb: IEV<A, B>, bc: IEV<B, C>): IV<C>;
export function isEvery<T>(...validators: Array<IV<any>>): IV<T> {
  return (value: any): value is T => validators.every(validator => validator(value));
}

export function isListOf<T>(validator: IValidator<T>): IValidator<T[]> {
  return (value: any): value is T[] => {
    return Array.isArray(value) && value.every(item => validator(item));
  };
}

export function isDictOf<T>(validator: IValidator<T>): IValidator<Dictionary<T>> {
  return (value: any): value is Dictionary<T> => {
    return typeof value === 'object' && Object.keys(value).every(key => typeof key === 'string' && validator(value[key]));
  }
}