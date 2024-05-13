import fg from 'fast-glob'
import type { UsageModule } from '../types';
import { resolve, dirname, join } from "node:path";

async function getUsageData(path: string) {
  const filePaths = fg.sync(`${path}/**/*.example.{js,ts}`);
  const absolutePaths = filePaths.map((p) => resolve(p));

  const usages: UsageModule[] = []

  for await (const filePath of absolutePaths) {
    const usageModule = await import(/* @vite-ignore */ filePath);
    const fileDir = dirname(filePath);
    const usage = usageModule.default;
    const registerPath = join(fileDir, usage.registerPath);

    usages.push({
      ...usage,
      registerPath
    });
  }

  return usages;
}

export async function withUsageData(data: any[], {
  pathToComponents
}: {
  pathToComponents: string;
}) {
  const updatedData: any[] = []
  const usages = await getUsageData(pathToComponents);

  for await (const page of data) {
    const usage = usages.find((u) => {
      return u.tag === page.props.component.tagName;
    }) ?? [];


    updatedData.push({
      ...page,
      props: {
        ...page.props,
        usage
      }
    })
  }

  return updatedData
}
