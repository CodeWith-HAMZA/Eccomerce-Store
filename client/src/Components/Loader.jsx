import React from 'react'

const Loader = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" overflow="visible" fill="#797979"><defs>    <rect id="inline" x="10" y="45" width="16" height="10" rx="2" ry="2"></rect> </defs> <use xlink:href="#inline" x="0"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate>    </use><use xlink:href="#inline" x="20"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate>    </use><use xlink:href="#inline" x="40"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate>    </use><use xlink:href="#inline" x="60"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate>    </use> </svg>
  )
}

export default Loader