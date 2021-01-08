const express = require('express');
const router = express.Router();
const data = require('../data.json')



const  getKeyByValue = (object, value) =>  {
  return Object.keys(object).find(key => object[key] === value);
}


router.get('/',(req,res)=>{
 res.json({message:'Dev test api...'});
})

const filterRecipes = (data) =>data.map(recipe=> recipe.recipe) //generate array of with names
                              .filter((name, index, array) =>  array.indexOf(name) === index )//if exists return -1, hence don't include


router.get('/unique_recipe_count',(req, res)=>{
const recipes = filterRecipes(data)
      res.json({unique_recipe_count:recipes.length})
})

router.get('/count_per_recipe',(req, res)=>{

const recipesAndCount = data.map(recipe=> recipe.recipe ) //generate array of with names
                       .reduce((array, currentRecipe) =>{ //iterating over the recipes
              
             let  recipe =   array.find(elem => elem.recipe === currentRecipe) //check for occurrance in my new array

          if(recipe === undefined) {
                 array.push({recipe:currentRecipe,count:1});
          }else{

        let recipeAtIndex = array.findIndex(element=> element.recipe == currentRecipe ); //find recipe index
         array[recipeAtIndex] = {...recipe,count:recipe.count+1}; //update recipe count

        }
       return array

}, []);


   res.json({count_per_recipe:recipesAndCount})
})



router.get('/busiest_postcode',(req,res)=>{

  let postCounts = {};

  //if this data is too much we can use promises 
  // or async awaits to prevent the lover code from
  //running before this
 data.map(element=> element.postcode)
                              .forEach((postCode)=>{
                                    postCounts[postCode] = (postCounts[postCode ] || 0) + 1
                                     })

     let counts = Object.values(postCounts) ;                                  
  
     let delivery_count =  Math.max(...counts) 
   
     let postcode  = getKeyByValue(postCounts,delivery_count)

  res.json({postcode,delivery_count})
})


router.get('/match_by_name/:query',(req, res) =>{

  const {query} = req.params;
     
   const recipes = filterRecipes(data)//re-use result in one to filter duplicates
                    .sort() //sort entries
                    .filter(recipe=> recipe.includes(query)) //filter if contains sub-string
          
   res.json({match_by_name:recipes})
})


module.exports = router;

