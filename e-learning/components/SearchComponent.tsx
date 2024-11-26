import { SearchIcon } from 'lucide-react'
import React from 'react'

function SearchComponent() {
  return (
    <div className="flex w-full items-center">
        <input type="text" placeholder="Search anything..." className="w-full py-3 px-2 border text-sm rounded-lg shadow-xl drop-shadow-lg outline-none focus:border-2 transition duration-150 focus:border-violet-500 peer" />
        <SearchIcon className="text-neutral-500 relative -translate-x-8 w-5 h-5 cursor-pointer hover:text-violet-600 active:text-violet-500 peer-focus:text-violet-600" />
    </div>
  )
}

export default SearchComponent