declare module '@custom-elements-manifest/analyzer/cli' {
  export function cli(args: { argv: string[]; cwd: string; noWrite: boolean }): Promise<any>;
}
