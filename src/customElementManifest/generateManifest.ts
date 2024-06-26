import { cli } from '@custom-elements-manifest/analyzer/cli.js'

export const generateManifest = async (path: string) => {
  const result = await cli({
    argv: ['analyze', '--dependencies', '--litelement', '--exclude=**/node_modules/**'],
    cwd: path,
    noWrite: true
  });

  return result
}
