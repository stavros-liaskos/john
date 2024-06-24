import React from 'react';
import IconTypes from './iconTypes';

const Moon: React.FunctionComponent<IconTypes> = ({ width = 40, height = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    color="var(--geist-foreground)"
    shapeRendering="geometricPrecision"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default Moon;
