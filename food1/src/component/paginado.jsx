import React from 'react'

export default function Paginado ({recipePerPage,allRecipe,paginado,currentP,setCurrenP}){
    const pageNumbers = []

    for (let i= 1; i<=Math.ceil(allRecipe/recipePerPage); i++) {
        pageNumbers.push(i)
        
    }
    function handlePrev(){
        setCurrenP(currentP - 1)
    }
    function handleNext(){
        setCurrenP(currentP + 1)
    }
    return (
        <nav className='flex-wrap self-center'>
            <ul  className='flex items-center flex-wrap space-x-4 '>
                <button disabled={currentP === pageNumbers[0]? true : false} onClick={(e)=> handlePrev(e)}>Prev</button>
                {pageNumbers && pageNumbers.map(number => (
                    <li  key={number}>
                    <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
                  <button disabled={currentP === pageNumbers[pageNumbers.length -1]? true : false} onClick={(e)=> handleNext(e)} >Next</button>
            </ul>
        </nav>
    )
}
                        