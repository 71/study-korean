const DEV: boolean;

declare module "*.svelte" {
  export default class {
    public constructor(options: import("svelte").ComponentConstructorOptions);
  };
}

declare namespace svelteHTML {
  export interface HTMLAttributes<T extends EventTarget> {
    /**
     * See https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable
     */
  	contenteditable?: true | false | "plaintext-only" | null;
  }
}
