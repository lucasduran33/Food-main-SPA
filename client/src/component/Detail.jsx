import React, {useEffect} from 'react';
import {recipesDetail} from '../actions';
import {useDispatch, useSelector, } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

export default function Detail(){
const dispatch = useDispatch()
const detailRecipe = useSelector((state) => state.detail)

console.log(detailRecipe)
const {id} = useParams()
useEffect(()=>{
    dispatch(recipesDetail(id))
    console.log(detailRecipe)
}, [dispatch, id]) //renderiza los detalles 


return (
    <div>
        {
           detailRecipe.length > 0 ?
           <div>
               <h1> {detailRecipe[0].name}</h1>
               <img src= {detailRecipe[0].image} alt="" width="500px" height="700px" />
                <h3>Puntaje: {detailRecipe[0].spoonacularScore}</h3>             
                <h4>Nivel de comida saludable:{detailRecipe[0].healthScore }</h4>
               <h2>Pasos: {detailRecipe[0].steps}</h2>  
               <p>Horario de comida: {detailRecipe[0].dishTypes ? detailRecipe[0].dishTypes : "No disponible en la receta"}</p>
               
               <h4>Dieta: {  detailRecipe[0].diets ?
               detailRecipe[0].diets.map((el) => el) :
               detailRecipe[0].Diets.map((el) => el.name)
                 }    </h4>
                     
               <h4>{detailRecipe[0].summary ? detailRecipe[0].summary.replace(/<[^>]*>?/g, "") : detailRecipe[0].resumenplato}</h4>
                
           </div> : <p>Loading..</p>
        }
        <Link to = '/home'>
            <button>Volver</button>
        </Link>

    </div> 
)
    }



