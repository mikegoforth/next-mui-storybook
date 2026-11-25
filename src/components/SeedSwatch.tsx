import * as React from 'react';

type SeedSwatchProps = React.SVGProps<SVGSVGElement> & {
  primary: string;
  secondary: string;
  tertiary: string;
  size?: number;
};

/**
 * The Material You color swatch: primary across the top half, secondary and
 * tertiary in the two bottom quarters.
 */
export default function SeedSwatch({
  primary,
  secondary,
  tertiary,
  size = 40,
  ...props
}: SeedSwatchProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M0 20a20 20 0 0 1 40 0z" fill={primary} />
      <path d="M20 20H0a20 20 0 0 0 20 20z" fill={secondary} />
      <path d="M20 20h20a20 20 0 0 1-20 20z" fill={tertiary} />
    </svg>
  );
}
