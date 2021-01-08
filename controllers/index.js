const url = require('url');
const data = require('../data.json')
const querystring = require('querystring');

//////This is where the logic of the api is located



//////////Setting up response 
const setUpResponse = (res)=>{
  res.statusCode = 200;
  res.setHeader('content-Type', 'Application/json');
}
/////////////
const filterRecipes = (data) =>data.map(recipe=> recipe.recipe) //generate array of with names
                              .filter((name, index, array) =>  array.indexOf(name) === index )//if exists return -1, hence don't include


 ////////////////////////////////
const  getKeyByValue = (object, value) =>  {
  return Object.keys(object).find(key => object[key] === value);
}

//should be better having different files in the controllers file

 exports.uniqueRecipeCount = (req, res)=>{
    setUpResponse(res)
     const recipes = filterRecipes(data)

     let unique_recipe_count = recipes.length;

   res.end(JSON.stringify({unique_recipe_count}))
 }

 exports.countPerRecipe = (req, res) =>{
   setUpResponse(res)

  const recipesAndCount = data.map(recipe=> recipe.recipe ) //generate array of with names
                       .reduce((array, currentRecipe) =>{ //iterating over the recipes
              
          let  recipe =   array.find(elem => elem.recipe === currentRecipe) //check for occurrance in my new array

          if(recipe === undefined) {  //If recipe is not in the new array
                 array.push({recipe:currentRecipe,count:1});
          }else{
        let recipeAtIndex = array.findIndex(element=> element.recipe == currentRecipe ); //find recipe index
         array[recipeAtIndex] = {...recipe,count:recipe.count+1}; //update recipe count at found index

        }
       return array

}, []);

  let count_per_recipe = recipesAndCount;

  res.end(JSON.stringify({count_per_recipe}))

 }

 exports.busiestPostcode = (req,res) => {
     let postCounts = {};

  //if this data is too much we can use promises or async/awaits to prevent the lower code from running before this
  data.map(element=> element.postcode)
                    .forEach((postCode)=>{
                              postCounts[postCode] = (postCounts[postCode ] || 0) + 1 //increment where index has 1
                                  })

     let counts = Object.values(postCounts) ;                                  
     let delivery_count =  Math.max(...counts) 
     let postcode  = getKeyByValue(postCounts,delivery_count)

      res.end(JSON.stringify({postcode,delivery_count}))

 }


exports.matchByName =  (req,res) => {

    const parsed = url.parse(req.url);
    const urlData  = querystring.parse(parsed.query);
    const {query} = urlData;

   const recipes = filterRecipes(data)//re-use result in one to filter duplicates
                    .sort() //sort entries
                    .filter(recipe=> recipe.includes(query)) //filter if contains sub-string
                    let match_by_name = recipes;

    res.end(JSON.stringify({match_by_name}))

}

