import React from 'react'
import { GoLocation } from 'react-icons/go';

export default function Menu() {
    return (
        <nav className="bg-transparent top-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-3">
                <a href="#home" className="text-lg font-medium text-black">
                  <GoLocation className="mr-2 inline-block text-red-500" /> MeetUp App
                </a>
                <div className="flex items-center">
                    <a href="#home" className="text-lg font-medium text-black mr-4">
                        Home
                    </a>
                    <a className="text-lg text-black mr-4">
                        About
                    </a>
                    </div>

            </div>
        </nav>
    )
}
