import { resolve } from "node:path";
import { getPathType } from './getPathType.js';

export async function getAbsolutePathsForImports(pathOrPaths: string | string[]) {
  const paths = Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths];
  
  const registerPaths = paths.map((p) => {
    if (getPathType(p) === 'relative') {
      return resolve(p); 
    }

    return p;
  })


  return registerPaths;
}

