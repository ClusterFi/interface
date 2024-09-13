import * as helpers from "./helpers";

const mediaNames = {
  phone: "phone",
  tablet: "tablet",
  xga: "xga",
  wxga: "wxga",
  wxgaPlus: "wxgaPlus",
  fullhd: "fullhd",
  "2k": "2k",
} as const;

export type MediaName = ValueOf<typeof mediaNames>;

export const breakpoints = {
  max: {
    phone: 319,
    tablet: 992,
    xga: 1170,
    wxga: 1439,
    wxgaPlus: 1699,
    fullhd: 1919,
    "2k": 2559,
  },
  min: {
    phone: 320,
    tablet: 993,
    xga: 1171,
    wxga: 1440,
    wxgaPlus: 1700,
    fullhd: 1920,
    "2k": 2560,
  },
};

const convert = (
  obj: Record<MediaName, number>,
  minmax: keyof typeof breakpoints,
) =>
  Object.keys(obj).reduce(
    (acc, name) => {
      const mediaName = helpers.prop(mediaNames, name);
      if (!mediaName) {
        return acc;
      }
      acc[mediaName] = `(${minmax}-width: ${obj[mediaName]}px)`;
      return acc;
    },
    {} as Record<MediaName, string>,
  );

export const min = convert(breakpoints.min, "min");
export const max = convert(breakpoints.max, "max");
export const breakpointList = Object.keys(breakpoints.max);
