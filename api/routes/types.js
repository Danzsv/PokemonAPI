const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

const {getTypes} = require('../utils/getTypes')
const {saveTypeDb,showTypesDb,deleteType} = require('../controllers/types')

router.get('/',showTypesDb)

router.post("/",getTypes,saveTypeDb)

router.delete('/:id',deleteType)


module.exports = router