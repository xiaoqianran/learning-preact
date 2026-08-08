declare module "@babel/standalone" {
  export function transform(
    code: string,
    options?: {
      filename?: string;
      presets?: unknown[];
      plugins?: unknown[];
    },
  ): { code: string | null | undefined };
  const Babel: {
    transform: typeof transform;
  };
  export default Babel;
}
