const DEV: boolean;

declare module "*.rawproto" {
  export default string;
}

declare module "*.svelte" {
  export default class {
    public constructor(options: import("svelte").ComponentConstructorOptions);
  };
}
