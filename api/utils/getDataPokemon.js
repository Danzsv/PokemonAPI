const axios = require("axios");
const { pokemonModel, typeModel } = require("../models/index");

const getApiPokemon = async (req,res,next) => {
  try {
    const oneCallPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    ); // primeros 20 pokemon 0/20
    
    const types = await typeModel.find({})
    // console.log(types)
    const allPokemon = await Promise.all(
      oneCallPokemon.data.results.map(async (pokemon) => {
        const poke = await axios.get(pokemon.url); // Ingreso a la url de cada poke para obtener propiedades
        const pokeUrl = poke.data;
        const tipesPokeUrl = pokeUrl.types.map(e => e.type.name)
        console.log(tipesPokeUrl)
        const type1 = types.filter(e => e.name === tipesPokeUrl[0])
        const type2 = types.filter(e => e.name === tipesPokeUrl[1])
        
        const typesDb = [...type1,...type2]
        const finallyTypes = typesDb.map(e => e._id)
        // console.log(types)
        return {
          pokedexId: pokeUrl.id,
          name: pokeUrl.name,
          hp: pokeUrl.stats[0].base_stat,
          attack: pokeUrl.stats[1].base_stat,
          defense: pokeUrl.stats[2].base_stat,
          speed: pokeUrl.stats[5].base_stat,
          height: pokeUrl.height,
          weight: pokeUrl.weight,          
          types: finallyTypes,
          image:
            pokeUrl.sprites["versions"]["generation-v"]["black-white"][
              "animated"
            ]["front_default"],
          // image: p.sprites["other"]["official-artwork"]["front_default"]
        };
      })
    );
    req.body = allPokemon
    next()
    // res.send(allPokemon)
  } catch (error) {
    console.log(error);
  }
};
// const uwu = getApiPokemon()
// console.log(uwu)
const savePokemonDb = async () => {
  const pokemons = await getApiPokemon();

  try {
    const result = await pokemons.forEach(async (e) => {
      await pokemonModel.create(e);
    });
    console.log(result);
    return result
  } catch (error) {
    console.log(error.message);
  }
};

// let uwu = savePokemonDb().then((r) => console.log(r));
// console.log(uwu);

const getPokemonDb = async () => {
  let pokemonsDB = await pokemonModel.find({});
  try {
    let dbPokemon = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(uwu)
    return dbPokemon;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  savePokemonDb,
  getApiPokemon,
};
