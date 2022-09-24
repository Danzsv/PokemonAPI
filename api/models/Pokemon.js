const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PokemonSchema = new Schema(
  {
    pokedexId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
      require: true,
    },
    hp: {
      type: Number,
      require: true,
    },
    attack: {
      type: Number,
      require: true,
    },
    defense: {
      type: Number,
      require: true,
    },
    speed: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    types: [
      {
        type: Schema.Types.ObjectId,
        ref: "Type",
      },
    ],
    custom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PokemonSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const PokemonModel = model("Pokemon", PokemonSchema);

module.exports = PokemonModel;
//Esquema Pokemon
