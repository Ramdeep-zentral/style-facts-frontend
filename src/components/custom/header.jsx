import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './modeToggle'

const Header = () => {
  return (
    <div className='py-5 bg-black text-white sticky top-0 w-full z-50'>
    <div className='container'>
        <div className="flex lg:justify-center lg:items-center w-full">
          <div className=" absolute left-10 top-5 hidden lg:block">
            <ModeToggle />
          </div>
          
          
          <Link href="/" className='logo'>Style•Facets</Link>

            <Link href="/add-your-story">
              <div className="font-outfit uppercase text-sm float-right absolute right-10 top-7">
                Add your Story
              </div>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default Header