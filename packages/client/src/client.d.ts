declare const __SERVER_PORT__: number

declare module './dist/server/entry-server.js' {
  export function render(url: string): Promise<{ html: string; head?: string }>
}
