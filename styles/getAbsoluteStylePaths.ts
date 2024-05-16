import { resolve } from "node:path";

export function getAbsoluteStylePaths(pathToStyles: string[] | string): string[] {
  const paths = Array.isArray(pathToStyles) ? pathToStyles : [pathToStyles];

  return paths.map((path) => resolve(path));
}
