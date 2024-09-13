import { breakpoints, max, min } from "./breakpoints";

export { breakpoints };

export const mediaWeights = {
  phone: 0,
  landscapePhone: 1,
  tablet: 2,
  xga: 3,
  wxga: 4,
  wxgaPlus: 5,
  fullhd: 6,
  "2k": 7,
} as const;

export type MediaWeights = typeof mediaWeights;
export type MediaName = keyof typeof mediaWeights;
export type MediaOriental = "portrait" | "landscape";
type GetUnion<T extends {}> = {
  [K in keyof T]: { name: K; weight: T[K]; oriental: MediaOriental };
}[keyof T];

export const orientals: TupleUnion<MediaOriental> = ["landscape", "portrait"];

export const priorityBreakNames = Object.entries(breakpoints.min)
  .sort(([, px], [, px2]) => px - px2)
  .map(([key]) => key) as MediaName[];

export type MediaContext = Readonly<GetUnion<MediaWeights>>;

export const mediaBreaks = {
  min,
  max,
};
