const express = require('express');
const router = express.Router();
const data = require('../data.json')



router.get('/',(req,res)=>{
 res.json({message:'Dev test api...'});
})


router.get('/unique_recipe_count',(req, res)=>{

const recipes = data.map(recipe=> recipe.recipe) //generate array of with names
                 .filter((name, index, array) => { 

                 return  array.indexOf(name) === index //if exists return -1, hence don't include
      })

      res.json({unique_recipe_count:recipes.length})
})

router.get('/count_per_recipe',(req, res)=>{

const recipesAndCount = data.map(recipe=> recipe.recipe ) //generate array of with names
                       .reduce((array, currentRecipe) =>{ //iterating over the recipes
              
         let  recipe =   array.find(elem => elem.recipe === currentRecipe) //check for occurrance in my new array

           if(recipe === undefined) {
           array.push({recipe:currentRecipe,count:1});
          }else{
        let recipeAtIndex = array.findIndex(element=> element.recipe == currentRecipe );
       array[recipeAtIndex] = {...recipe,count:recipe.count+1};

        }
       return array

}, []);

   res.json({count_per_recipe:recipesAndCount})
})





module.exports = router;

