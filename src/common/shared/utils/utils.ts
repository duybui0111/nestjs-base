import { readFile } from 'fs/promises';

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

export const readJsonFile = async (path: string): Promise<any> => {
  return JSON.parse(await readFile(path, 'utf-8'));
};

export const getAppVersion = async (): Promise<string> => {
  const packageJson = await readJsonFile('./package.json');

  return packageJson.version as string;
};
