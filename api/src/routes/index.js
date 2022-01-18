const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Recipe, Diet } = require("../db")
const {
    YOUR_API_KEY
  } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfo = async () => {
  
    const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=3c80fbce03e748f783aa9dad3501a649&number=100&addRecipeInformation=true`)
    const apiDatas = urlApi.data.results 
    const infoApi = await apiDatas.map(el => {
     
        return {
            id: el.id,
            name:el.title,
            image: el.image,
            steps: el.analyzedInstructions.map(el => el.steps.map(e => e.step)),
            diets: el.diets,
            dishTypes: el.dishTypes,
            summary: el.summary,
            spoonacularScore: el.spoonacularScore,
            healthScore: el.healthScore,
            
        }
    })
    
   return infoApi;
}


const getDbInfo = async () => {
    return await Recipe.findAll({ 
        include:
        {
            model: Diet,
            as: 'Diets',
            attributes:['nombre'],
            through: {
                attributes: [],
            },
        },
    })
    
}
  

const getAllRecipes = async () => {
    const apiInfo = await getInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo); // <- devuelve un arreglo  apiInfo
    return infoTotal; 
}
    
   

router.get('/recipes', async (req,res) => {
    console.log(0)
    const name =  req.query.name
    let recipesTotal = await getAllRecipes();
    if (name){
        console.log(1)
        let recipeName =  recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())) // <- .toLowerCase().includes(name.toLowerCase())
        recipeName.length ? 
        res.status(200).send(recipeName) :
        res.status(404).send('No hay receta Disponible')
    }
    else{
        console.log(2)
        res.status(200).send(recipesTotal)
    }
})
        




router.get('/types', async(req,res)=>{
    console.log(0)
    let recipeTotal = await getAllRecipes();//traigo todas las recetas
    let arrayDietas = []
    let defaultDiet= [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low fodmap",
        "whole30",]

    recipeTotal.forEach(el=>{
        console.log(1)
        el.diets.forEach(el=>{
            if(!arrayDietas.includes(el)){
                arrayDietas.push(el)
            }
        })
    })
    console.log(2)
    arrayDietas.length?
    arrayDietas.map(el=>{
        Diet.create({nombre:el})
        
    })
    :defaultDiet.map(el=>{
        Diet.create({nombre:el})
        res.send('Dietas agregadas en Base de datos')
    })


})

   


 router.post('/recipe', async (req,res) => {
     console.log(0)
let {
        nombre,
        resumenplato,
        puntuacion,
        comidaSaludable,
        pasoapaso,
        diet,
        createdInDb, 
    }= req.body
    
let recipeCreated = await Recipe.create({
    nombre,
    resumenplato,
    puntuacion,
    comidaSaludable,
    pasoapaso,
    createdInDb,
    
})

let dietDb = await Diet.findAll({
    where: {
        nombre: diet
    }

})
console.log(req.body)
recipeCreated.addDiet(dietDb) ?
res.status(200).send ('Receta creada con exito') :
res.status(404).send ("Error en cargar la receta")
 })


 
 router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id
    const recipesTotal = await getAllRecipes();
    if (id){
        let recipesId = await recipesTotal.filter(e => e.id == id)
        recipesId.length? 
        res.status(200).json(recipesId) :
        res.status(404).send('Receta no encontrada')
        console.log(recipesId)
    }
 })



module.exports = router;
