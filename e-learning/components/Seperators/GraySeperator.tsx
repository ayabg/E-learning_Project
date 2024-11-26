import React from 'react'

function GraySeperator({classname}: {classname?: string}) {
  return (
    <div className={`w-full h-px bg-gray-400 ${classname}`} />
  )
}

export default GraySeperator