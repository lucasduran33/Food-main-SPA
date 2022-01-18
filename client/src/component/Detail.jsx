import React, {useEffect} from 'react';
import {recipesDetail} from '../actions';
import {useDispatch, useSelector} from 'react-redux'
import { useParams, Link,useNavigate } from 'react-router-dom';

export default function Detail(){
const dispatch = useDispatch()
const detailRecipe = useSelector((state) => state.detail)
console.log(detailRecipe)
const {id} = useParams()
useEffect(()=>{
    dispatch(recipesDetail(id))
    console.log(detailRecipe)
}, [dispatch , id]) //renderiza los detalles 


return (
    <div>
        {
           detailRecipe.length > 0 ?
           <div>
               <h1> {detailRecipe[0].name}</h1>
               <img src= {detailRecipe[0].image ? detailRecipe[0].image : detailRecipe[0].img} alt="" width="500px" height="700px" />
               <h2>Status: {detailRecipe[0].steps}</h2>  
               <p>Cumpleaños: {detailRecipe[0].dishTypes}</p>
               <h4>Ocupaciones: {!detailRecipe[0].createdInDb? detailRecipe[0].diet  + " " : detailRecipe[0].diets.map(el => el.name + (' '))}</h4>
               <h4>{detailRecipe[0].summary}</h4>
           
           </div> : <p>Loading..</p>
        }
        <Link to = '/home'>
            <button>Volver</button>
        </Link>

    </div> 
)
    }





