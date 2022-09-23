const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TypeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TypeSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const TypeModel = model("Type", TypeSchema);

module.exports = TypeModel;
//Esquema Type