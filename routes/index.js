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







module.exports = router;

