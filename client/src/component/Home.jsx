
import {useEffect, useState}from 'react'; 
import {useDispatch, useSelector,} from 'react-redux'
import {getRecipes, filterByDiets, filterOrder, filterByScore} from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './paginado';
import SearchBar from './Searchbar';

export default function Home () {
    const dispatch = useDispatch()
    const allRecipe = useSelector ((state) => state.recipes)
    const [order, setOrder]= useState('')
    const [currentP, setCurrenP] = useState(1) // pagina actual y cual sera la pagina actual
    const [recipePerPage] = useState(9)  // cantidad recetas por pag
    const indexOfLastRecipe = currentP * recipePerPage  // son 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // 0 || 
    const currentRecipes = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe)
    
   
    

    const paginado = (pageNumber) => {
        setCurrenP(pageNumber)
    }


useEffect(() => {
    console.log("llega la recipe")
    dispatch(getRecipes())
},[dispatch])  



function handleRecipe (e) {
    e.preventDefault()
    dispatch(getRecipes(e))
}
function handleFilterDiets (e) {
    dispatch(filterByDiets(e.target.value))
    
}
function handleOrder (e) {
    e.preventDefault()
    dispatch(filterOrder(e.target.value))
   setCurrenP(1); // <- setear para q comience a ordenar desde la pagina 1 
   setOrder(`Ordenado ${e.target.value}`)  //<- modifique el estado local y me renderice 
}
function handleScore (e) {
    e.preventDefault()
    dispatch(filterByScore(e.target.value))
    setCurrenP(1);
    setOrder(`puntaje ordenado de ${e.target.value}`)
}


return (
    <div>
            <h1>
               AGUANTE EL BAJOOOON
            </h1>
            <Link to= '/recipe'> Crear Receta</Link>
        
            <button onClick ={(e) =>handleRecipe(e)}>
                Volver a cargar recetas
            </button>
            <SearchBar/>
            <div>
                <select onChange={(e) => handleFilterDiets(e)} >   
                    <option value='allRecipe'> Tipo de dieta</option>
                    <option value='allRecipe'>Todas las dietas</option>
                    <option value='gluten free'> Gluten free</option>                  
                    <option value='ketongenic'>Ketogenic</option>
                    <option value='vegetarian'> Vegetarian</option>
                    <option value='lacto ovo vegetarian'> lacto ovo vegetarian</option>
                    <option value='vegan'> Vegan</option>
                    <option value='pescetarian'>Pescetarian</option>
                    <option value='paleo'>Paleo</option>
                    <option value='primal'> Primal</option>
                    <option value='low fodmap'> Low Fodmap</option>
                    <option value='whole30'> Whole30</option>
                    <option value='dairy free'> Dairy Free</option>
                    

                </select>
                <select onChange={(e) => handleOrder(e)}>
                    <option value='asc'>A-Z</option>
                    <option value ='des'>Z-A</option>
                </select>
            
                <select onChange={(e) => handleScore(e)}>
                    <option value='puntuacion'>Puntuacion</option>
                    <option value='mayorScore'>Mayor puntaje</option>
                    <option value='menorScore'>Menor puntaje</option>
                </select>
                <Paginado recipePerPage={recipePerPage} allRecipe={allRecipe.length} paginado={paginado}/> 
      {
          currentRecipes?.map( el =>{
              return (
                  <fragment classname= 'cartas'>
             
               <Link to={'/home'}>
                <Card name={el.name? el.name : el.nombre} img={el.image} diet={el.diets? el.diets : el.diet}  id={el.id}/>
               </Link>
             
                
            </fragment>
            
            )
        }) 
     }
            </div>
    </div>
       
       
       
       
       )
       
    }
       
       
       