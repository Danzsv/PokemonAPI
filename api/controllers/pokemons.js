const { pokemonModel } = require("../models");

const createPokemon = async (req, res) => {
  try {
    let uwu = req.body;

    // console.log(uwu);
    const result = await pokemonModel.create(uwu);

    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const allPokemonDB = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await pokemonModel.find({}).populate("types");
    const sortResult = result.sort(function (a, b) {
      if (a.pokedexId > b.pokedexId) {
        return 1;
      }
      if (b.pokedexId > a.pokedexId) {
        return -1;
      }
      return 0;
    });

    if (name) {
      let pokemonName = sortResult.filter(
        (e) => e.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (pokemonName.length === 0) {
        res.status(200).send(["No existe el pokemon"]);
      } else {
        res.status(200).send(pokemonName);
      }
    } else {
      res.status(200).send(sortResult);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const searchPokeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length > 6) {
      const result = await pokemonModel.findById(id).populate("types");
      console.log(result);
      return res.send(result);
    } else {
      const srchPokedexId = await pokemonModel
        .findOne({ pokedexId: id })
        .populate("types");

      return res.send(srchPokedexId);
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePoke = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await pokemonModel.delete({ _id: id });
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = { createPokemon, allPokemonDB, searchPokeById, deletePoke };
