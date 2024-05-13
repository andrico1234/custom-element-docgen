export type Usage = {
  title: string;
  description: string;
  code: string;
  tag: string;
}

export type UsageModule = {
  tag: string;
  registerPath: string;
  usages: Usage[];
}
