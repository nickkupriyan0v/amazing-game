declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string

declare module './dist/server/entry-server.js' {
  export function render(url: string): Promise<{ html: string; head?: string }>
}
