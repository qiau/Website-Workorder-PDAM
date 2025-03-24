export const toSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase) as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key.replace(/([A-Z])/g, "_$1").toLowerCase(),
        toSnakeCase(value),
      ])
    ) as T;
  }
  return obj;
};

export const toCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value),
      ])
    ) as T;
  }
  return obj;
};
