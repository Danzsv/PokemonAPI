const express = require("express");

const router = express.Router();

const { getApiPokemon } = require("../utils/getDataPokemon");
const {
  createPokemon,
  allPokemonDB,
  searchPokeById,
  deletePoke,
} = require("../controllers/pokemons");

router.post("/", createPokemon);

router.get("/", allPokemonDB);

router.get("/:id", searchPokeById);

router.delete("/:id", deletePoke);

router.post("/apiToDb", getApiPokemon, createPokemon);

module.exports = router;
