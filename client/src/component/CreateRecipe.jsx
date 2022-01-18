import { useEffect , useState} from "react";
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { postRecipe, getDiets } from "../actions";
   

export default function RecipeCreate () {
    const dispatch = useDispatch()

    const [error, setErrors] = useState({});   
    const [input, setInput] = useState({
        nombre:"",
        resumenplato: "",
        puntuacion:"",
        comidaSaludable:"",
        pasoapaso:"",
        diet:[],
        
    })
useEffect(() => {
    dispatch(getDiets())
},[dispatch]);


function handleCheck(e) {
    if (e.target.checked){
        setInput({
            ...input,
            diet:[...input.diet,e.target.value] 
        })
    }  
}
function handleSubmit(e) {
    e.preventDefault()
    console.log(input)
    dispatch(postRecipe(input))
    alert('Receta creada!')
    setInput({
        nombre:"",
        resumenplato: "",
        puntuacion:"",
        comidaSaludable:"",
        pasoapaso:"",
        diet:[],
        
    })
}

    function validate(input){
    let error = {}
    if(!input.nombre){
        error.nombre = 'Se requiere un nombre'
    }else if (!input.resumenplato){
        error.resumenplato= 'Se requiere el resumen del plato'
    }else if(!input.puntuacion){
        error.puntuacion= 'Se requiere la puntuacion'
    } else if(!input.comidaSaludable){
        error.comidaSaludable = 'Se requiere el nivel de comida saludable'
    } else if(!input.pasoapaso){
        error.pasoapaso = 'Se requiere los pasos'
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
return (
    <div>
        <Link to= '/Home'>
            <button>Volver</button>
        </Link>
        <h1>Crea tu Receta!</h1>
        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div> 
                <label>Nombre:</label>
                <input type='text' value={input.nombre} name='nombre' onChange={(e) =>handleChange(e)}/>
                {error.nombre && (
                    <p>{error.nombre}</p>
                )}
            </div>
            <div>
                    <label>Resumen plato</label>
                    <input type= 'text' value = {input.resumenplato} name= 'resumenplato' onChange={(e) =>handleChange(e)}/>
                    {error.resumenplato && (
                    <p>{error.resumenplato}</p>
                    )}
            </div>
            <div>
                    <label>Puntuacion</label>
                    <input type= 'text' value = {input.puntuacion} name= 'puntuacion' onChange={(e) =>handleChange(e)}/>
                    {error.puntuacion && (
                    <p>{error.puntuacion}</p>
                    )}
            </div>
            <div>
                    <label>Comida saludable</label>
                    <input type= 'text' value = {input.comidaSaludable} name= 'comidaSaludable' onChange={(e) =>handleChange(e)}/>
                    {error.comidaSaludable && (
                    <p>{error.comidaSaludable}</p>
                    )}
                    </div>
                    <div>
                    <label>Paso a Paso</label>
                    <input type= 'text' value = {input.pasoapaso} name= 'pasoapaso' onChange={(e) =>handleChange(e)}/>
                    {error.pasoapaso && (
                    <p>{error.pasoapaso}</p>
                    )}
            </div>
            <div>
                 <label>Dietas</label> 
                
                  <label>
                 Gluten Free
                 <input type='checkbox' name='gluten free' value='gluten free' onChange={(e)=> handleCheck(e)}/>
                 </label>
                 <label>
                 Dairy Free
                 <input type='checkbox' name='dairy free' value='dairy free' onChange={(e)=> handleCheck(e)}/>
                 </label>
                 <label>
                 Lacto Ovo Vegetarian
                 <input type='checkbox' name='lacto ovo vegetarian' value='lacto ovo vegetarian'onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                    Vegan
                 <input type='checkbox' name='Vegan' value='vegan' onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                 Paleolithic
                 <input type='checkbox' name='paleolithic' value='paleolithic' onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                    Vegan
                 <input type='checkbox' name='Vegan' value='vegan' onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                 Primal
                 <input type='checkbox' name='primal' value='primal' onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                 Pescatarian
                 <input type='checkbox' name='pescatarian' value='pescatarian' onChange={(e)=> handleCheck(e)}/>
                 </label>
                 <label>
                 Fodmap Friendly
                 <input type='checkbox' name='fodmap friendly' value='fodmap friendly' onChange={(e)=> handleCheck(e)} />
                 </label>
                 <label>
                 Whole 30
                 <input type='checkbox' name='whole 30' value='whole 30' onChange={(e)=> handleCheck(e)} />
                 </label>

                  <ul><li>{input.diet.map(e => e + " ,")}</li></ul>
                  <button type='submit'>Crear Receta</button>
            </div>
            
        </form>
    </div>
               
)
              

}


    