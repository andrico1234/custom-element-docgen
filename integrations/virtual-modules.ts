import type { AstroConfig, ViteUserConfig } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function resolveVirtualModuleId<T extends string>(id: T): `\0${T}` {
  return `\0${id}`;
}

/** Taken from Starlight integration https://github.com/withastro/starlight/blob/main/packages/starlight/integrations/virtual-user-config.ts */
export function vitePluginCreateVirtualModules(
  opts: {
    components: Record<string, string>
  },
  {
    root,
  }: Pick<AstroConfig, 'root'> & {
    build: Pick<AstroConfig['build'], 'format'>;
  }
): NonNullable<ViteUserConfig['plugins']>[number] {
  const resolveId = (id: string) =>
    JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(root), id) : id);

  const virtualComponentModules = Object.fromEntries(
    Object.entries(opts.components).map(([name, path]) => [
      `virtual:components/${name}`,
      `export { default } from ${resolveId(path)};`,
    ])
  );

  /** Map of virtual module names to their code contents as strings. */
  const modules = {
    ...virtualComponentModules,
  } satisfies Record<string, string>;

  /** Mapping names prefixed with `\0` to their original form. */
  const resolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
      resolveVirtualModuleId(`${key}`),
      key,
    ])
  );

  return {
    name: 'vite-plugin-create-virtual-modules',
    resolveId(id): string | void {
      if (id in modules) return resolveVirtualModuleId(id);
    },
    load(id): string | void {
      const resolution = resolutionMap[id];
      if (resolution) return modules[resolution];
    },
  };
}
