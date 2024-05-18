import fg from 'fast-glob'
import { resolve, dirname } from "node:path";
import { getPathsForImports } from '../helpers/getPathsForImports.js';

type Usage = {
  title: string;
  description: string;
  snippet: string;
  tag: string;
}

type UsageModule = {
  tag: string;
  registerPaths: string | string[];
  usages: Usage[];
}


async function getUsageData(path: string) {
  // TODO: fix this so it also supports TS files
  const filePaths = fg.sync(`${path}/**/*.example.js`);
  const absolutePaths = filePaths.map((p) => resolve(p));

  const usages: UsageModule[] = []

  for await (const filePath of absolutePaths) {
    const usageModule = await import(filePath);
    const fileDir = dirname(filePath);
    const usage = usageModule.default as UsageModule;
    const registerPaths = await getPathsForImports(usage.registerPaths, fileDir);

    usages.push({
      ...usage,
      registerPaths
    });
  }

  return usages;
}

export async function withUsageData(data: any[], {
  componentsDir
}: {
  componentsDir: string;
}) {
  const updatedData: any[] = []
  const usages = await getUsageData(componentsDir);

  for await (const page of data) {
    const usage = usages.find((u) => {
      return u.tag === page.props.component.tagName;
    });

    if (!usage) {
      continue;
    }

    const formattedUsages = usage.usages.map((u) => {
      return {
        ...u,
        snippet: u.snippet.trim()
      };
    });

    updatedData.push({
      ...page,
      props: {
        ...page.props,
        usage: {
          ...usage,
          usages: formattedUsages
        }
      }
    })
  }

  return updatedData
}
