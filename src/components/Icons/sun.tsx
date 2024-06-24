import React from 'react';
import IconTypes from './iconTypes';

const Sun: React.FunctionComponent<IconTypes> = ({ width = 24, height = 24, colour = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={colour}
    width={width}
    height={height}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    color="var(--geist-foreground)"
    shapeRendering="geometricPrecision"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

export default Sun;
