const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
 res.json({message:'Dev test api...'});
})

module.exports = router;

