declare module 'virtual:components/Sidebar' {
  const Sidebar: typeof import('../src/components/Sidebar.astro').default;
  export default Sidebar;
}

declare module 'virtual:components/Usage' {
  const Usage: typeof import('../src/components/Usage.astro').default;
  export default Usage;
}
declare module 'virtual:components/Layout' {
  const Layout: typeof import('../src/components/Layout.astro').default;
  export default Layout;
}

declare module 'virtual:components/Page' {
  const Page: typeof import('../src/components/Page.astro').default;
  export default Page;
}

declare module 'virtual:components/Head' {
  const Head: typeof import('../src/components/Head.astro').default;
  export default Head;
}

declare module '@custom-elements-manifest/analyzer/cli.js' {
  export function cli(args: { argv: string[]; cwd: string; noWrite: boolean }): Promise<any>;
}
