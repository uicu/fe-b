import * as React from 'react'
const SvgBlanks = props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm.666 2A.667.667 0 0 0 4 5.667v12.666c0 .369.298.667.666.667h14.667a.667.667 0 0 0 .667-.667V5.667A.667.667 0 0 0 19.333 5H4.666z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M7 15a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7zm0-8a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7z"
      clipRule="evenodd"
    />
    <path d="M7 9h2v6H7z" />
    <path d="M23.666.333h-23v23h23z" opacity={0.01} />
  </svg>
)
export default SvgBlanks
