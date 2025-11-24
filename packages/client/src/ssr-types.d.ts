declare module './dist/server/entry-server.js' {
  export function render(url: string): Promise<{
    html: string
    initialState: unknown
  }>
}
