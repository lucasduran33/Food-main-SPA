const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Recipe, Diet } = require("../db")
const {
    YOUR_API_KEY2
  } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfo = async () => {
  
    const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&number=100&addRecipeInformation=true`)
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
   const allRecipesDb = await Recipe.findAll({ 
        include:
        {
            model: Diet,
            as: 'Diets',
            attributes:['name'],
            through: {
                attributes: [],
            },
        },
    })
    console.log(`aqui estan las recetas de${allRecipesDb}`)
    return allRecipesDb
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
        recipeName.length <0 ? 
        res.status(404).send('No hay receta Disponible'):
        res.status(200).send(recipeName) 
    }
    else{
        console.log(2)
        res.status(200).send(recipesTotal)
    }
})
        




router.get('/types', async (req, res) => {
    const diets = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap friendly",
        "whole 30",
    ]

    diets.forEach(el => {
        Diet.findOrCreate({ 
            where: { name: el }  //por cada tipo de dieta
        })
    })

    const allTypes = await Diet.findAll()
    res.send(allTypes)
    console.log(allTypes)
})

   


 router.post('/recipe', async (req,res) => {
     console.log(0)
let {
        name,
        summary,
        spoonacularScore,
        healthScore,
        steps,
        diets,
        image,
        createdInDb, 
    }= req.body
    
let recipeCreated = await Recipe.create({
    name,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    createdInDb,
    
})

let dietDb = await Diet.findAll({
    where: {
        name: diets
    }
})

recipeCreated.addDiet(dietDb) ?
res.status(200).send ('Receta creada con exito') :
res.status(404).send ("Error en cargar la receta")

console.log(req.body)

 })


 router.put("/recipe", async (req, res)=>{
    const {
      
        name,
        summary,
        spoonacularScore,
        healthScore,
        steps,
        diets,
        image,
        createdInDb,   
    } = req.body
    let getrecipess= await getAllRecipes()
  let search = getrecipess.filter(e=> e.name === name.toString()) 
  console.log(search)
  
  if(search.length){
    const result = await Recipe.update(
      { 
        dificultad: dificultad? dificultad: search.dificultad,
        summary: summary ? summary : search.summary,
        spoonacularScore: spoonacularScore ? spoonacularScore : search.spoonacularScore,
        healthScore: healthScore? healthScore : search.healthScore ,
        steps: steps ? steps : search.steps,
        diets: diets ? diets : search.diets,
        image: image ? image : search.diets,
        createdInDb,   
       }, //what going to be updated
      { where: { name: name }} // where clause
    )   
   return res.send(result)
  }else{
    return res.send("La receta no existe")
  }
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
