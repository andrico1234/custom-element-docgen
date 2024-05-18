import { join } from 'path';
import { getPathType } from './getPathType.js';

export async function getPathsForImports(pathOrPaths: string | string[], fileDir: string) {
  const paths = Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths];

  const registerPaths = paths.map((p) => {
    if (getPathType(p) === 'relative') {
      return join(fileDir, p);
    }

    return p;
  })


  return registerPaths;
}
