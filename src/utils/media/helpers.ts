export function isKey<T extends {}>(
  object: T,
  key: PropertyKey | undefined | null,
): key is keyof T {
  return Boolean(key && key in object);
}

export function prop<T extends {}>(
  object: T,
  key: PropertyKey | undefined | null,
): T[keyof T] | undefined {
  return isKey(object, key) ? object[key] : undefined;
}
