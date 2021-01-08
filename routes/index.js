////////////////////////////////////////////
/////This is where all the routing takes place


const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var controllers = require('../controllers/index.js');
    const reqUrl =  url.parse(req.url, true);
// GET endpoints switch would be better too 
  if(reqUrl.pathname == '/unique_recipe_count' && req.method === 'GET') {
    controllers.uniqueRecipeCount(req, res);
   }else if(reqUrl.pathname == '/count_per_recipe' && req.method === 'GET'){
     controllers.countPerRecipe(req,res)
   }else if(reqUrl.pathname == '/busiest_postcode' && req.method === 'GET'){
     controllers.busiestPostcode(req,res)
   }else if(reqUrl.pathname == '/match_by_name'  && req.method === 'GET'){
     controllers.matchByName(req,res)
   }
 })


