type Children =
  | number
  | string
  | Promise<string>
  | boolean
  | null
  | undefined
  | Children[];

type PropsWithChildren<t = {}> = {
  children?: children;
  backgroundUrl?: string;
  heroImageUrl?; string;
} & T;
