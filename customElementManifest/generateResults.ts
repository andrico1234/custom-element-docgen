import { cli } from '@custom-elements-manifest/analyzer/cli'

export const generateResults = async (path: string) => {
  const result = await cli({
    argv: ['analyze', '--dependencies', '--litelement'],
    cwd: path,
    noWrite: true
  });

  return result
}
