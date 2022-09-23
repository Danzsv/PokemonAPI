const axios = require("axios");
const { typeModel } = require("../models/index");

const getTypes = async (req,res,next) =>{

    try {
        const types = await axios.get('https://pokeapi.co/api/v2/type')    
        const allTypes = types.data.results.map( (element) => ({name: element.name}))
        
        req.body = allTypes    
        next()
        
    } catch (error) {
        console.log(error.message)
    }
    
}

// console.log(uwu)

module.exports = {getTypes}