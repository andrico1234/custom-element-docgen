declare module 'virtual:components/Sidebar' {
  const Sidebar: typeof import('./components/Sidebar.astro').default;
  export default Sidebar;
}

declare module 'virtual:components/Usage' {
  const Usage: typeof import('./components/Usage.astro').default;
  export default Usage;
}
declare module 'virtual:components/Layout' {
  const Layout: typeof import('./components/Layout.astro').default;
  export default Layout;
}

declare module '@custom-elements-manifest/analyzer/cli' {
  export function cli(args: { argv: string[]; cwd: string; noWrite: boolean }): Promise<any>;
}