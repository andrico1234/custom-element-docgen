export type Usage = {
  title: string;
  description: string;
  snippet: string;
  tag: string;
}

export type UsageModule = {
  tag: string;
  registerPath: string;
  usages: Usage[];
}
