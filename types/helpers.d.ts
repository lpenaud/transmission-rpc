export type KeysArray<T> = (keyof T)[];

export type Tuple<T, K extends KeysArray<T>> = {
  [I in keyof K]: T[K[I]];
};

export type PropertyValues<T> = T[keyof T][];
