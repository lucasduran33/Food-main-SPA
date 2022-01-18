import React from 'react'
import {Link} from 'react-router-dom'

export default function landingPage(){
    return (
        <div>
            <h1>
                Bienvenidos a la food recipes
            </h1>
            <Link to = '/home'>
                <button>Ir al Home</button>
                </Link>
        </div>
    )
}