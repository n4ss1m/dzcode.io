import { LanguageCode } from "../language";

export type Flatten<T> = T extends any[] ? T[number] : T; // eslint-disable-line @typescript-eslint/no-explicit-any

export type OptionalPropertiesOf<T extends object> = Required<
  Pick<
    T,
    Exclude<
      {
        [K in keyof T]: T extends Record<K, T[K]> ? never : K;
      }[keyof T],
      undefined
    >
  >
>;

export type RequiredPropertiesOf<T extends object> = Omit<T, keyof OptionalPropertiesOf<T>>;

export type TreeItem<R extends Record<string, unknown>> = {
  id: string;
  children?: TreeItem<R>[];
} & R;

export type SplitString<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...SplitString<U, D>]
      : [S];

export type PopSubString<S extends string, D extends string> = string extends S
  ? string
  : S extends ""
    ? []
    : S extends `${string}${D}${infer U}`
      ? PopSubString<U, D>
      : S;

export type PyramidSplitString<
  S extends string,
  D extends string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
> = S extends `${infer L}-${PopSubString<S, D>}` ? [L, ...PyramidSplitString<L, D>] : [];

export type PartialWithOneRequiredKey<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

/**
 * find the key that ends with the language code and remove language code from it
 * @example
 * type Post = {
 *  title_ar: string;
 *  title_en: string;
 *  author: string;
 * }
 * type PostNoLang = StripLanguage<"ar" | "en", Post>;
 * // { title: string; author: string; }
 */
export type StripLanguage<M extends Record<string, unknown>> = {
  [K in keyof M as K extends `${infer F}_${LanguageCode}` ? F : K]: M[K];
};
