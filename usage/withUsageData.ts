import fg from 'fast-glob'
import { resolve, dirname, join } from "node:path";

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

function getPathType(path: string) {
  if (path.startsWith('./') || path.startsWith('../')) {
    return 'relative';
  } else if (path.startsWith('/')) {
    return 'absolute';
  } else {
    return 'module';
  }
}

async function getPathsForComponents(pathOrPaths: string | string[], fileDir: string) {
  const paths = Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths];

  const registerPaths = paths.map((p) => {
    if (getPathType(p) === 'relative') {
      return join(fileDir, p);
    }

    return p;
  })


  return registerPaths;
}

async function getUsageData(path: string) {
  const filePaths = fg.sync(`${path}/**/*.example.{js,ts}`);
  const absolutePaths = filePaths.map((p) => resolve(p));

  const usages: UsageModule[] = []

  for await (const filePath of absolutePaths) {
    const usageModule = await import(/* @vite-ignore */ filePath);
    const fileDir = dirname(filePath);
    const usage = usageModule.default as UsageModule;
    const registerPaths = await getPathsForComponents(usage.registerPaths, fileDir);

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
