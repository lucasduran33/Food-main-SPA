
import {useEffect, useState}from 'react'; 
import {useDispatch, useSelector,} from 'react-redux'
import {getRecipes, filterByDiets, filterOrder, filterByScore, getDiets} from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './paginado';
import SearchBar from './Searchbar';
import  '../component/cssComponents/Home.css'
export default function Home () {
    const dispatch = useDispatch()
    const allRecipe = useSelector ((state) => state.recipes)
    const alldiets= useSelector ((state)=> state.diets)
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
    dispatch(getDiets())
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
    <div className='containerhome'>
            <h1>
               AGUANTE EL BAJOOOON
            </h1>
            <div className='fixed'>

            
            <Link to= '/recipe'> Crear Receta</Link>
        
            <button onClick ={(e) =>handleRecipe(e)}>
                Volver a cargar recetas
            </button>
            <SearchBar/>
            <div>
                <select onChange={(e) => handleFilterDiets(e)} >   
                    <option value='allRecipe'> Tipo de dieta</option>
                   {
                       alldiets?.map(el => {
                           return (
                               <option key={el.id} name={el.name}>{el.name}</option>
                           )
                       })
                   }
                    

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
                <Paginado setCurrenP={setCurrenP} currentP={currentP}recipePerPage={recipePerPage} allRecipe={allRecipe.length} paginado={paginado}/> 
                </div>
               <div className='cartas'>
                {
          currentRecipes?.map( el =>{
              return (
                  <div  >
             
               <Link to={'/home'}>
                <Card name={el.name? el.name : el.nombre} img={el.image} 
                diet={
              
                 el.diets? el.diets 
                 : el.Diets.map(e => e.name)
                
                     
                    }  
                    id={el.id}/>
               </Link>
            
                
            </div>
            
            )
            
        }) 
     }
      </div>
            </div>
    </div>
       
       
       
       
       )
       
    }
       
       
       