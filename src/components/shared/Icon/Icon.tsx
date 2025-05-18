import { ComponentPropsWithRef, forwardRef } from 'react';

import * as Icons from './icons';

export type Glyph = keyof typeof Icons;

export { Icons };

export type IconProps = {
  glyph: Glyph;
  title?: string;
} & ComponentPropsWithRef<'svg'>;

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { glyph, ...restProps },
  ref
) {
  const Component = Icons[glyph];
  if (Component) {
    return <Component {...restProps} ref={ref} />;
  }

  console.warn('Unknown icon glyph to render', glyph);
  return null;
});
