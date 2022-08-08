import axios from 'axios';



export function getRecipes (){
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch ({
            type: 'GET_RECIPES', 
            payload: json.data
        })
    }
}

export function getDiets () {
        return async function (dispatch){
var json = await axios.get ('http://localhost:3001/types')
    return dispatch ({
        type: 'GET_DIETS',
        payload: json.data
    })    }
}

export function postRecipe (payload) {
    return async function (dispatch) {
        const response = axios.post('http://localhost:3001/recipe', payload);
        console.log(response)
        return response;
    }
}
export function putRecipe(payload){
    return async (dispatch)=>{
        let json = await axios.put("http://localhost:3001/recipe", payload)
        return json
    }
}



export function GetNameRecipes(payload){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + payload)
            return dispatch({
                type: 'GET_NAME_RECIPE',
                payload: json.data,
            })
        }
            catch(err){
                console.log('ERROR')
            }
        }
    }

export function filterByDiets (payload) {
    console.log(payload)
    return {
        type: 'FILTER_BY_DIET',
        payload
    }

}
export function filterOrder (payload) {
    console.log(payload)
    return {
        type: 'FILTER_BY_ORDER',
        payload
        
    }
}
export function filterByScore (payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_SCORE',
        payload
    }
}

export function recipesDetail (id){
    return async function (dispatch)
    {const response = await axios.get('http://localhost:3001/recipes/'+ id);
       
    return dispatch({
            type: 'RECIPES_DETAIL',
            payload: response.data})
        }
}


