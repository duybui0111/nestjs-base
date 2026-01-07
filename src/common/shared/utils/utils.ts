export const throwError = (message?: string): never => {
  const errorMessage = process.env.APP_DEBUG === 'true' ? message : '';

  throw new Error(errorMessage);
};

export const getEnumKeyByValue = (
  enumObject: object,
  value: any,
): string | undefined => {
  return Object.keys(enumObject).find((key) => enumObject[key] === value);
};
