export type Falsy<T> = false | 0 | "" | null | undefined | T;

export type AnyObject = Record<PropertyKey, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export type EmptyObject = Record<PropertyKey, never>;

export type Class<T> = new (...args: unknown[]) => T;

export type Nullable<T extends object> = {
  [K in keyof T]: T[K] | null;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[]
  : T[P] extends Readonly<infer U>[] ? Readonly<DeepPartial<U>>[]
  : DeepPartial<T[P]>;
};

export type IndexOf<T extends [], S extends number[] = []> =
  T["length"] extends S["length"] ? S[number] : IndexOf<T, [S["length"], ...S]>;

export type ObjectKeys<T> =
  T extends object ? Array<keyof T>
  : T extends number ? []
  : T extends unknown[] | string ? string[]
  : never;

export type SomePartial<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SomeRequired<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export type Tuple<T, N extends number> =
  N extends N ?
    number extends N ?
      T[]
    : _TupleOf<T, N, []>
  : never;

export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

export type Booleanish = Falsy<boolean | "true" | "false">;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type UndefinedToNull<T> = T extends undefined ? Exclude<T, undefined> | null : T;
