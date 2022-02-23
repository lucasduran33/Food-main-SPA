import React from 'react'
import {Link} from 'react-router-dom'
import '../component/cssComponents/Landing.css'
export default function landingPage(){
    return (
        <div className='background'>
            <h1>
                Book of recipes
            </h1>
            <div className='btncontainer'>
            <Link to = '/home'>
                <button className='btnlanding'>Get all recipes!</button>
                </Link>
            </div>

        </div>
    )
}