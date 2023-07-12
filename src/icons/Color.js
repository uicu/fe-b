import * as React from 'react'
const SvgColor = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g fillRule="evenodd">
      <path d="m13.197 7.347 5.245 12.98a1 1 0 0 1-1.854.75L14.94 17H9.059l-1.647 4.077a1 1 0 1 1-1.854-.75l5.245-12.98A1 1 0 0 1 12 6.76l-.105.036a1 1 0 0 1 1.301.552zM12 9.721 9.867 15h4.265L12 9.72z" />
      <rect width={2} height={4} rx={1} transform="translate(11 2)" />
      <rect width={2} height={4} rx={1} transform="scale(-1 1) rotate(45 -7.328 -4.45)" />
      <rect width={2} height={4} rx={1} transform="scale(-1 1) rotate(-45 -3.672 26.935)" />
      <g transform="rotate(90 5.5 16.5)">
        <rect width={2} height={4} rx={1} />
        <rect width={2} height={4} y={16} rx={1} />
      </g>
    </g>
  </svg>
)
export default SvgColor
