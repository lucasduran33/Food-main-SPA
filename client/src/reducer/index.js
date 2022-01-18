const initialState ={
    recipes: [],
    allRecipes: [],
    diets: [],
    detail : [],
}

function rootReducer (state = initialState, action) {

    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case 'GET_DIETS':
            return {
                ...state,
                diets:action.payload,

            }
        case 'GET_NAME_RECIPE':

        return {
            ...state,
            recipes: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
            case 'FILTER_BY_DIET':
            const allFilterRecipes = state.allRecipes
            const dietFiltered = action.payload === 'allRecipe' ? allFilterRecipes : allFilterRecipes.filter((el) => el.diets.includes(action.payload))
             
            console.log(allFilterRecipes)
            console.log(dietFiltered)
            return {
                    ...state,
                    recipes: dietFiltered,
                }
            case 'FILTER_BY_ORDER':
                let sortName = action.payload === 'asc'?
                state.recipes.sort(function (a,b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;   // <- lo devuelve igual 
                })   :
                state.recipes.sort(function (a, b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return {
                        ...state,
                        recipes: sortName
                    }
                case 'FILTER_BY_SCORE':
                    let sortScore = action.payload === 'mayorScore' ?
                    state.recipes.sort(function (a,b){
                        if(a.spoonacularScore > b.spoonacularScore){
                            return 1;
                        }
                        if (b.spoonacularScore > a.spoonacularScore){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.recipes.sort(function (a, b){
                        if (a.spoonacularScore > b.spoonacularScore){
                            return -1;
                        }
                        if (b.spoonacularScore > a.spoonacularScore){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                            ...state,
                            recipes: sortScore
                        }
                case  'RECIPES_DETAIL' :
                   
                    return {
                        ...state,
                        detail: action.payload
                    }
          default: 
              return {
                  ...state,
              }
    
  }
  
}
            

        
               

            
                
    

            
 

export default rootReducer;





