export function getPathType(path: string) {
  if (path.startsWith('./') || path.startsWith('../')) {
    return 'relative';
  } else if (path.startsWith('/')) {
    return 'absolute';
  } else {
    return 'module';
  }
}
