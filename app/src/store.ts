import { derived, readonly, writable } from "svelte/store";
import { Db, DefinedWord, Word } from "./db";

/**
 * The promises which resolves when {@link db} becomes available.
 */
export const dbPromise = Db.load();

/**
 * The "raw" {@link Db} store which is initially `undefined` and then becomes
 * either a {@link Db} or an {@link Error} depending on whether it successfully loaded.
 */
export const loadingDb = writable<Db | undefined | Error>(undefined);

// Set `db` outside of the callback given to `loadingDb` to make sure the promise is only
// observed once.
dbPromise.then(
  (db) => loadingDb.set(db),
  (err) => loadingDb.set(err instanceof Error ? err : new Error(err)),
);

/**
 * The {@link Db} of the app which should only be accessed in components created
 * _after_ ensuring that the {@link loadingDb} successfully resolved.
 */
export const db = derived(loadingDb, (db) => db as Db);

/**
 * The kind of a {@link Route}.
 */
export const enum RouteKind {
  /** The index shown when the path is empty. */
  Index,
  /** A sequence of word definitions to explore. */
  SentenceExplorer,
  /** An unknown route. */
  Unknown,
}

/**
 * The route of the app.
 */
export type Route =
  | { readonly kind: RouteKind.Index }
  | { readonly kind: RouteKind.Unknown; readonly path: string }
  | {
      readonly kind: RouteKind.SentenceExplorer;
      readonly sentence: string;
      readonly words: readonly string[];
    };

function parseRoute(path: string = location.pathname): Route {
  if (path === "/") {
    return { kind: RouteKind.Index };
  }
  if (path.startsWith("/s/")) {
    const components = path.slice(3).split("/");

    if (components.length === 0 || components[0].trim().length === 0) {
      return { kind: RouteKind.Index };
    }

    return {
      kind: RouteKind.SentenceExplorer,
      sentence: unescapeString(components[0]),
      words: components.slice(1).map(unescapeString),
    };
  }
  return { kind: RouteKind.Unknown, path };
}

/**
 * Escapes a string for usage in an URL.
 */
function escapeString(string: string): string {
  return string.replace(/[^\p{L}_\d.,!-]+/gu, (s) => encodeURIComponent(s));
}

function unescapeString(string: string): string {
  return decodeURIComponent(string);
}

function stringifyRoute(route: Route): string {
  switch (route.kind) {
    case RouteKind.Index:
      return "/";
    case RouteKind.SentenceExplorer:
      return `/s/${escapeString(route.sentence)}/${route.words.map(escapeString).join("/")}`;
    case RouteKind.Unknown:
      return route.path;
  }
}

/**
 * The underlying route store.
 */
const rwRoute = writable<Route>(parseRoute(), (set) => {
  const eventListener = () => set(parseRoute());

  addEventListener("popstate", eventListener);

  return () => removeEventListener("popstate", eventListener);
});

/**
 * Navigates to the given URL.
 */
export function navigate(to: Route | string, options: { inplace: boolean }) {
  if (typeof to !== "string") {
    to = stringifyRoute(to);
  }

  if (options.inplace) {
    history.replaceState(undefined, "", to);
  } else {
    history.pushState(undefined, "", to);
  }
  rwRoute.set(parseRoute());
}

/**
 * The current route.
 */
export const route = readonly(rwRoute);

/**
 * Whether translations should be shown in the UI.
 */
export const showTranslations = writable(true);
