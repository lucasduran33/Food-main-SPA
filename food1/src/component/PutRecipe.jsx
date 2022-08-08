import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, getRecipes, putRecipe } from "../actions/index";
//import "./formulario2.css"

export default function FormularioPut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allDiets = useSelector((state) => state.diets)

    const [error, setErrors] = useState({});   
    const [input, setInput] = useState({
        name:"",
        summary: "",
        spoonacularScore:"",
        healthScore:"",
        steps:"",
        image:"",
        diets:[],
        
    })
    useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())
    }, [dispatch])

    function handleCheck(e) {
    
        setInput({
            ...input,
            diets:[...input.diets,e.target.value] 
        })
    
}
function handleChange (e){
    setInput ({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }));
}  
function handleSelect(e) {
    if (e.target.value) {
        if (!input.name.includes(e.target.value)) {
            console.log("entre")
            setInput({
                ...input,
                name: [e.target.value]
            })
        }  
        if (!e.target.value) {
            input.name.splice(input.name.indexOf(e.target.value), 1);
            setInput({
                ...input,
            });
        }
    }
}


function handleBox(e) {
    setInput ({
        ...input,
        diets: [...input.diets, e.target.value]
    })
    console.log(input.diets)
}


function handleDelete (el){
    setInput({
        ...input,
        diets: input.diets.filter (oc => oc !== el )
    })
}
function handleSubmit(e) {
    e.preventDefault()
    console.log(input)
    dispatch(putRecipe(input))
    alert('Receta editada!')
    setInput({
        name:"",
        summary: "",
        spoonacularScore:"",
        healthScore:"",
        steps:"",
        image:"",
        diets:[],
        
    })
}
return (
    <div>
        <Link to= '/Home'>
            <button>Volver</button>
        </Link>
        <h1>Edita tu Receta</h1>
        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div> 
                <label>Nombre:</label>
                <input type='text' value={input.name} name='name' onChange={(e) =>handleChange(e)}/>
                {error.name && (
                    <p>{error.name}</p>
                )}
            </div>
            <div>
                    <label>Resumen plato</label>
                    <input type= 'text' value = {input.summary} name= 'summary' onChange={(e) =>handleChange(e)}/>
                    {error.summary && (
                    <p>{error.summary}</p>
                    )}
            </div>
            <div>
                    <label>Puntuacion</label>
                    <input type= 'number' min="1" value = {input.spoonacularScore} name= 'spoonacularScore' onChange={(e) =>handleChange(e)}/>
                    {error.spoonacularScore && (
                    <p>{error.spoonacularScore}</p>
                    )}
            </div>
            <div>
                    <label>Comida saludable</label>
                    <input type= 'number' min="1" value = {input.healthScore} name= 'healthScore' onChange={(e) =>handleChange(e)}/>
                    {error.healthScore && (
                    <p>{error.healthScore}</p>
                    )}
                    </div>
                    <div>
                    <label>Paso a Paso</label>
                    <input type= 'text' value = {input.steps} name= 'steps' onChange={(e) =>handleChange(e)}/>
                    {error.steps && (
                    <p>{error.steps}</p>
                    )}
            </div>
            <div>
                <label>Imagen</label>
                <input type= 'text' value = {input.image} name= 'image' onChange={(e) =>handleChange(e)}/>
               
            </div>
            <div>
               <select  onChange={(e) => handleBox(e)}>
                   <option disabled value='Dietas' >  Tipo de dietas  </option>
                     {
          allDiets?.map(el => {
            return (
                <option key={el.id} value={el.name} >  {el.name} </option>
            )
        })
                     }           
               
                   </select>
            </div>
            <div className='delete'>


   </div>
                  <button type='submit' >Crear Receta</button>
               
                  {/* disabled={Disablesubmit} */}

            
        </form>
        {input.diets.map(el => 
   <div  className='telede'> 
       <p>{el}</p>
       <button  className='telede' onClick={()=>handleDelete(el)}>x</button>
   </div>)}
    </div>
               
)
              

}


