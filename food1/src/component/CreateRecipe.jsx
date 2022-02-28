import { useEffect , useState, useMemo} from "react";
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { postRecipe, getDiets } from "../actions";
  
function validarNumero(parametro){
    if(!/^[0-9]*$/.test(parametro)){
        return false
    }else {
        return true
    }
}
const validarLetra = (name) => {
    const regex = new RegExp(/^[A-Z]+$/i);
    return regex.test(name);
};


export default function RecipeCreate () {
    const dispatch = useDispatch()
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
},[dispatch]);


function handleCheck(e) {
    
        setInput({
            ...input,
            diets:[...input.diets,e.target.value] 
        })
    
}
function handleSubmit(e) {
    e.preventDefault()
    console.log(input)
    dispatch(postRecipe(input))
    alert('Receta creada!')
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

    function validate(input){
    let error = {}
    if(!input.name){
        error.name = 'Se requiere un nombre'
    }if(input.name && !validarLetra(input.name)){
        error.name = 'Solo Letras permitidas'
    }if (!input.summary){
        error.summary= 'Se requiere el resumen del plato'
    }if(input.summary && !validarLetra(input.summary)){
        error.summary = 'Solo Letras permitidas'
    }if(!input.spoonacularScore){
        error.spoonacularScore= 'Se requiere la puntuacion'
    }if(input.spoonacularScore > 100){
        error.spoonacularScore= 'La puntuacion no puede ser mayor a 100'
    }if (input.spoonacularScore <= 0 ){
        error.spoonacularScore = 'El score no puede ser  0'
    }
    if(!input.healthScore){
        error.healthScore = 'Se requiere el nivel de comida saludable'
    }if(input.healthScore > 100){
        error.healthScore= 'La puntuacion no puede ser mayor a 100'
    }if (input.healthScore <= 0 ){
        error.healthScore = 'El nivel saludable no puede ser  0'
    }

    if(!input.steps){
        error.steps = 'Se requiere los pasos'
    }if(input.steps && !validarLetra(input.steps)){
        error.steps = 'Solo Letras permitidas'
    }if(!input.image){
        error.image = 'Campo opcional! '
    }
    return error;
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
const Disablesubmit= useMemo (() => {
    if(
        input.name.length > 0 &&
        input.name.length < 30 &&
        validarLetra(input.name)&&
        input.summary.length > 0 &&
        input.summary.length < 500 &&
        validarLetra(input.summary)&&
        input.steps.length > 0 &&
        input.steps.length < 500 &&
        validarLetra(input.steps)&&
        input.spoonacularScore<= 100 &&
        input.spoonacularScore>= 1 &&
        input.healthScore<= 100 &&
        input.healthScore>= 1 &&
        input.diets.length >= 1 &&
        input.diets.length <= 2
      
       
    ){
        return false;
    }else {
        return true;
    }
})


return (
    <div>
        <Link to= '/Home'>
            <button>Volver</button>
        </Link>
        <h1>Crea tu Receta!</h1>
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
                  <button type='submit' disabled={Disablesubmit}>Crear Receta</button>
               
                

            
        </form>
        {input.diets.map(el => 
   <div  className='telede'> 
       <p>{el}</p>
       <button  className='telede' onClick={()=>handleDelete(el)}>x</button>
   </div>)}
    </div>
               
)
              

}


    