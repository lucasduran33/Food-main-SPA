import React from 'react'
import {Link} from 'react-router-dom'
import './cssComponents/Landing.css'
export default function landingPage(){
    return (
        <div className='background'>
            <h1 className='self-center text-center '>
                Book of recipes
            </h1>
            <div className='  self-center text-center'>
            <Link to = '/home'>
                <button className='w-3/4 mt-6 m-8 text-2xl bg-amber-600 hover:opacity-70  btn-custom px-6 py-4 rounded-full text-white font-medium ease-in-out transition duration-700 '>Get all recipes!</button>
                </Link>
            </div>

        </div>
    )
}